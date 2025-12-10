import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-3 py-3 border border-gray-300 rounded-lg outline-none text-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
)

const AddAddress = () => {
  const { axios, user, navigate } = useAppContext()

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAddress((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/address/add', { address })
      if (data.success) {
        toast.success(data.message)
        navigate('/cart')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (!user) navigate('/cart')
  }, [])

  return (
    <div className="mt-16 pb-16 px-4 md:px-10">
      <p className="text-3xl font-semibold text-[var(--color-text-dark)]">
        Add Shipping <span className="text-[var(--color-primary)]">Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-10 items-center md:items-start gap-8">
        {/* Form */}
        <div className="flex-1 max-w-lg w-full bg-card p-6 rounded-xl shadow-md">
          <form onSubmit={onSubmitHandler} className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="firstName" type="text" placeholder="First Name" />
              <InputField handleChange={handleChange} address={address} name="lastName" type="text" placeholder="Last Name" />
            </div>

            <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Email address" />
            <InputField handleChange={handleChange} address={address} name="street" type="text" placeholder="Street" />

            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="city" type="text" placeholder="City" />
              <InputField handleChange={handleChange} address={address} name="state" type="text" placeholder="State" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="zipcode" type="number" placeholder="Zip code" />
              <InputField handleChange={handleChange} address={address} name="country" type="text" placeholder="Country" />
            </div>

            <InputField handleChange={handleChange} address={address} name="phone" type="text" placeholder="Phone" />

            <button className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dull transition uppercase shadow-sm">
              Save Address
            </button>
          </form>
        </div>

        {/* Image */}
        <img
          className="md:mr-10 w-64 md:w-80 object-contain rounded-xl shadow-md"
          src={assets.add_address_iamge}
          alt="Add Address"
        />
      </div>
    </div>
  )
}

export default AddAddress
