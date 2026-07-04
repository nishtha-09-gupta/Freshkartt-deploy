import User from "../models/User.js";
import Address from "../models/Address.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const cookieOptions = {
    httpOnly: true, // Prevent JavaScript to access cookie
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
};

const generateToken = (userId) => jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '7d'});

const sendAuthResponse = (res, user, options = {}) => {
    const token = generateToken(user._id);
    const { includeToken = false, message } = options;

    res.cookie('token', token, cookieOptions)

    return res.json({
        success: true,
        ...(includeToken && {token}),
        user: {email: user.email, name: user.name},
        ...(message && {message})
    })
}

const ensureDemoAddress = async (user) => {
    const existingAddress = await Address.findOne({
        userId: user._id.toString(),
        email: user.email
    });

    if(existingAddress) return;

    await Address.create({
        userId: user._id.toString(),
        firstName: 'Demo',
        lastName: 'User',
        email: user.email,
        street: 'Demo Address',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipcode: 400001,
        country: 'India',
        phone: '9999999999'
    })
}

// /api/user/register
export const register = async (req, res)=>{
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.json({success: false, message: 'Missing Details'})
        }

        const existingUser = await User.findOne({email})

        if(existingUser)
            return res.json({success: false, message: 'User already exists'})

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({name, email, password: hashedPassword})

        return sendAuthResponse(res, user)
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// /api/user/login

export const login = async (req, res)=>{
    try {
        const { email, password } = req.body;

        if(!email || !password)
            return res.json({success: false, message: 'Email and password are required'});
        const user = await User.findOne({email});

        if(!user){
            return res.json({success: false, message: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch)
            return res.json({success: false, message: 'Invalid email or password'});

        return sendAuthResponse(res, user)
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// /api/auth/demo-login
export const demoLogin = async (req, res)=>{
    try {
        const demoEmail = 'demo@freshkartt.com';
        let user = await User.findOne({email: demoEmail});

        if(!user){
            const hashedPassword = await bcrypt.hash('demo123', 10);
            user = await User.create({
                name: 'Demo User',
                email: demoEmail,
                password: hashedPassword,
                address: 'Demo Address',
                phone: '9999999999'
            })
        }

        await ensureDemoAddress(user);

        return sendAuthResponse(res, user, {
            includeToken: true,
            message: 'Logged in as Demo User'
        })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// /api/user/is-auth
export const isAuth = async (req, res)=>{
    try {
        const { userId } = req.body;
        const user = await User.findById(userId).select("-password")
        return res.json({success: true, user})

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// /api/user/logout

export const logout = async (req, res)=>{
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
