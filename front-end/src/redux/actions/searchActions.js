export const searchRoasters = async(dispatch, formData) => {
    console.log(formData);
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/roasters/search?location=denver&query=${formData.query}`, {
        credentials: 'include',
    });
    console.log(response);
    const parsed = await response.json();
    console.log(parsed);
}