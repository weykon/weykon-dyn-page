'use client'



export default function ErrorPage({
    error, reset
}: {
    error: Error,
    reset: () => void
}) {
    return (
        <div>
            <h1>{error.message}</h1>
        </div>
    );
}