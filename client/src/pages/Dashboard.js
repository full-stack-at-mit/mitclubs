import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../api/auth'
import Layout from '../components/Layout'
import { unauthenticateUser } from '../redux/slices/authSlice'
import defaultAvatar from '../assets/default-profile.jpg'
import { FaUser, FaEnvelope, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa'

const Dashboard = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState(null)

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo()

      setProtectedData(data.info)
      setLoading(false)
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    protectedInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="text-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4"></div>
            <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
          {/* Profile Header */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start">
            {/* Avatar */}
            <img
              src={protectedData.avatarUrl || defaultAvatar}
              alt={protectedData.name}
              className="w-32 h-32 rounded-full object-cover shadow-md"
            />

            {/* User Info */}
            {/* <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-800">{protectedData.name}</h2>
              <p className="text-gray-600 mt-2">{protectedData.bio}</p>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-gray-500" />
                  <span className="text-gray-700">{protectedData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-gray-500" />
                  <span className="text-gray-700">
                    Joined on {new Date(protectedData.joinedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div> */}
          </div>

          {/* Logout Button */}
          <div className="mt-8 flex justify-center sm:justify-end">
            <button
              onClick={logout}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Dashboard
