import AuthPage from "./Auth";

export default async function AuthPageServer() {
        return (
            <div className="w-auto flex flex-col items-center">
                <AuthPage />
            </div>
        );
}