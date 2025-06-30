import { useMutation } from "@tanstack/react-query"

const FollowUnfollow = (userId)=>{
const {mutate:follow} = useMutation({
    mutationFn:async (userId) => {
        try {
            const res = await fetch(`/api/v1/user/follow/${userId}`,{
                method:"POST"
            })
            const data = await res.json()
            
            if (!res.ok) {
                throw new Error(data.error || "something went wrong")
            }
            return data;
        } catch (error) {
            throw new Error(error.message)
        }
    },
    onSuccess: (data)=>{
        toast.success(data.message)
    },
    onError:(error)=>{
        toast.error(error.message)
    }
})
}
export default FollowUnfollow