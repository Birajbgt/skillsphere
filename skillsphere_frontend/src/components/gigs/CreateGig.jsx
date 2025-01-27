// import axios from "axios";
// import React, { useState } from "react";
// import toast from "react-hot-toast";

// const CreateGig = () => {
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [budget, setBudget] = useState("");
//     const [deadline, setDeadline] = useState("");
//     const [image, setImage] = useState(null); // State for the image

//     const handleCreateGig = async (e) => {
//         e.preventDefault();
//         try {
//             const formData = new FormData(); // Use FormData for file uploads
//             formData.append("title", title);
//             formData.append("description", description);
//             formData.append("budget", budget);
//             formData.append("deadline", deadline);
//             if (image) formData.append("image", image); // Append the image

//             const response = await axios.post(
//                 "http://localhost:4000/api/v1/gig/create",
//                 formData,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     },
//                 }
//             );
//             toast.success(response.data.message);
//             setTitle("");
//             setDescription("");
//             setBudget("");
//             setDeadline("");
//             setImage(null);
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Failed to create gig.");
//         }
//     };

//     return (
//         <div>
//             <h2>Create a New Gig</h2>
//             <form onSubmit={handleCreateGig}>
//                 <div>
//                     <label>Title:</label>
//                     <input
//                         type="text"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Description:</label>
//                     <textarea
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Budget:</label>
//                     <input
//                         type="number"
//                         value={budget}
//                         onChange={(e) => setBudget(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Deadline:</label>
//                     <input
//                         type="date"
//                         value={deadline}
//                         onChange={(e) => setDeadline(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Upload Image:</label>
//                     <input
//                         type="file"
//                         onChange={(e) => setImage(e.target.files[0])}
//                         accept="image/*"
//                     />
//                 </div>
//                 <button type="submit">Create Gig</button>
//             </form>
//         </div>
//     );
// };

// export default CreateGig;
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import "./CreateGig.css";

const CreateGig = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [deadline, setDeadline] = useState("");
    const [image, setImage] = useState(null);

    const handleCreateGig = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("budget", budget);
            formData.append("deadline", deadline);
            if (image) formData.append("image", image);

            const response = await axios.post(
                "http://localhost:4000/api/v1/gig/create",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success(response.data.message);
            setTitle("");
            setDescription("");
            setBudget("");
            setDeadline("");
            setImage(null);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create gig.");
        }
    };

    return (
        <div className="create-gig-container">
            <h2>Create a New Gig</h2>
            <form onSubmit={handleCreateGig}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Budget:</label>
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Deadline:</label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Upload Image:</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                    />
                </div>
                <button type="submit" className="btn-primary">Create Gig</button>
            </form>
        </div>
    );
};

export default CreateGig;
