export default async function getAllGames() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');

    if(!res.ok) throw new Error('failed to get users');

    return res.json();
}