import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../services/github";
import { getUserRepos } from "../services/github";

export function Profile() {
    const { username } = useParams();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [repos, setRepos] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loadingRepos, setLoadingRepos] = useState(false);

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

    useEffect(() => {
        async function fetchRepos() {
            if (!username) return;

            setLoadingRepos(true)

            try {
                const data = await getUserRepos(username, page);
                setRepos((prev) => [...prev, ...data]);
            } catch (error) {
                console.log("Error fetching repos")
            } finally {
                setLoadingRepos(false)
            }
        }
        fetchRepos();
    }, [page, username])


    useEffect(() => {
        function handleScroll() {
            if (loadingRepos) return;
            
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= fullHeight - 50) {
                setPage((prev) => prev + 1);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }

    }, []);



    if (loading) return <p>Loading...</p>


    return (
        <div>
            <img src={user?.avatar_url} width={100} />
            <h1>{user?.name}</h1>
            <p>{user?.bio}</p>


            <h2>Repositories:</h2>
            {repos.map((repo) => (
                <div key={repo.id}>
                    <a href={repo.html_url} target="_blank">
                        {repo.name}
                    </a>
                </div>
            ))}
            {loadingRepos && <p>Loading more repos...</p>}
        </div>
    );

}