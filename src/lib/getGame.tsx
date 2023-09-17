export default async function getGame(id: number) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if(!res.ok) throw new Error('failed to get users');

    return res.json();
}