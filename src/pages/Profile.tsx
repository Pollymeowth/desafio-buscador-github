import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../services/github";

export function Profile() {
    const { username } = useParams();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            if (!username) return;

            try {
                const data = await getUser(username);
                setUser(data);
            } catch (error) {
                console.log("Error fetching user")
            } finally {
                setLoading(false)
            }
        }
        fetchUser();
    }, [username]);

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <img src={user?.avatar_url} width={100} />
            <h1>{user?.name}</h1>
            <p>{user?.bio}</p>
        </div>
    );



}