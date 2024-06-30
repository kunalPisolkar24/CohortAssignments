import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import React, { useEffect, useState } from "react"

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await fetch("http://localhost:3000/api/auth/me", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    } else {
                        console.error("Failed to fetch user");
                    }
                } else {
                    console.error("Token not found");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    const getAvatarFallback = (username) => {
        return username ? username.charAt(0).toUpperCase() : 'U';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-background">
            <Card className="w-full max-w-md p-6 bg-card text-card-foreground">
                <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-20 h-20 text-4xl border-2 border-primary">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback className="">{getAvatarFallback(user.username)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center space-y-1">
                        <h3 className="text-2xl font-semibold">{user.username}</h3>
                        <p className="text-muted-foreground">Joined on {formatDate(user.createdAt)}</p>
                        <div className="flex justify-center items-center">
                            <DollarSignIcon className="w-5 h-5 mr-1" />
                            <span className="text-2xl font-semibold"> {user.balance.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

function DollarSignIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    )
}