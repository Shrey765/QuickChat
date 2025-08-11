import react, {useState, useContext} from 'react'
import { useNavigate } from 'react-router'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

export default function ProfilePage(){

    const {authUser, updateProfile} = useContext(AuthContext)

    const [selectImg, setSelectImg] = useState(null);
    const [name, setName] = useState(authUser.fullName);
    const [bio, setBio] = useState(authUser.bio);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        if(!selectImg){
            await updateProfile({fullName: name, bio});
            navigate('/');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(selectImg);
        reader.onload = async () => {
            const base64Image = reader.result;
            await updateProfile({profilePic: base64Image, fullName: name, bio});
            navigate('/');
        }
    };

    return(
       <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl backdrop-blur-2xl text-gray-300 border border-gray-600 bg-gray-900/30 rounded-xl shadow-lg flex items-center justify-between gap-6 p-6 max-sm:flex-col-reverse">
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
            <h3 className="text-2xl font-semibold text-white">Profile Details</h3>

            {/* Avatar Upload */}
            <label htmlFor="avatar" className="flex items-center gap-4 cursor-pointer hover:opacity-90 transition">
                <input type="file" onChange={(e) => setSelectImg(e.target.files[0])} id="avatar" accept=".png, .jpeg, .jpg" className="hidden" />
                <img
                src={selectImg ? URL.createObjectURL(selectImg) : assets.avatar_icon}
                className={`w-14 h-14 object-cover ${selectImg ? 'rounded-full' : 'rounded-md'}`}
                />
                <span className="text-sm text-gray-400">Change Avatar</span>
            </label>

            {/* Name Input */}
            <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                required
                placeholder="Your Name"
                className="p-3 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            {/* Bio Textarea */}
            <textarea
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                placeholder="Your bio"
                required
                rows={4}
                className="p-3 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
            ></textarea>

            {/* Save Button */}
            <button
                onClick={() => navigate('/')}
                className="bg-violet-600 text-white p-3 rounded-md font-medium hover:bg-violet-700 transition-colors"
            >
                Save
            </button>
            </form>

            {/* Side Image */}
            <img
            src={authUser.profilePic || assets?.logo_icon}
            alt="Logo"
            className={`max-w-[140px] aspect-square rounded-full object-contain mx-auto max-sm:mt-6 
                ${selectImg && 'rounded-full'}`}
            />
        </div>
        </div>

    )
}