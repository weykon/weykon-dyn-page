type Props = {
    params: {
        user: string
    }
}
export const revalidate = 60
const UserProfilePage = async (props: Props) => {
    return (
        <div className="text-center">
            <p>Hi, Welcome!</p>
          
        </div >
    )
}

export default UserProfilePage;