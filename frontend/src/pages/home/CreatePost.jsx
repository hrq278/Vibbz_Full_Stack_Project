import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CreatePost = () => {

	const [text, setText] = useState("");
	const [image, setImage] = useState(null);
	const imageRef = useRef(null);

	const queryClient = useQueryClient()
	const {data:authUser} = useQuery({queryKey: ["authUser"]}) 
	

	const {mutate:createPost, isError, isPending} = useMutation({
		mutationFn:async ({text, image}) => {
			const res = await fetch("/api/v1/post/create",{
				method:"POST",
				headers:{
					"Content-Type": "application/json"
				},
				body: JSON.stringify({text,image})
			});
			const data = await res.json()
			if (!res.ok) {
				throw new Error( data.error || "Something went wrong" )
			}
			return data;
		},
		onSuccess: (data)=>{
			setText("");
			setImage(null);
			toast.success(data.message || "Post Created SuccessFully")
			queryClient.invalidateQueries({ queryKey : ["posts"] })
		},
		onError: (error)=>{
			toast.error(error.message || "Create Post Failed ")
		}
	})

	const handleSubmit = (e) => {
		e.preventDefault();
		// alert("Post created successfully");
		createPost({text, image})
	};

	const handleImgChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className='flex p-4 items-start gap-4 border-b border-gray-700'>
			<div className='avatar'>
				<div className='w-8 rounded-full'>
					<img src={authUser.profileImage || "/avatar-placeholder.png"} />
				</div>
			</div>
			<form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
				<textarea
					className='textarea w-full p-0 text-lg resize-none border-none focus:outline-none  border-gray-800'
					placeholder='What is happening?!'
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				{image && (
					<div className='relative w-72 mx-auto'>
						<IoCloseSharp
							className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
							onClick={() => {
								setImage(null);
								imageRef.current.value = null;
							}}
						/>
						<img src={image} className='w-full mx-auto h-72 object-contain rounded' />
					</div>
				)}

				<div className='flex justify-between border-t py-2 border-t-gray-700'>
					<div className='flex gap-1 items-center'>
						<CiImageOn
							className='fill-primary w-6 h-6 cursor-pointer'
							onClick={() => imageRef.current.click()}
						/>
						<BsEmojiSmileFill className='fill-primary w-5 h-5 cursor-pointer' />
					</div>
					<input type='file' hidden ref={imageRef} onChange={handleImgChange} />
					<button className='btn btn-primary rounded-full btn-sm text-white px-4'>
						{isPending ? "Posting..." : "Post"}
					</button>
				</div>
				{isError && <div className='text-red-500'>Something went wrong</div>}
			</form>
		</div>
	);
};
export default CreatePost;