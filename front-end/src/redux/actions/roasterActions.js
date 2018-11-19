export const loadRoasters = async () => {
    console.log("LOADING ROASTERS ALREADY");
    const roasters = await fetch(`${process.env.REACT_APP_API_HOST}/roasters`, {
        credentials: 'include'
    })
    const roastersParsed = await roasters.json();
    console.log(roastersParsed);
}