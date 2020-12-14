export default async function fetchConfig(path, setter) {
    try {
        const configPath = `${path}.model.json`;
        const response = await fetch(configPath);
        const configRes = await response.json();
        setter(configRes);
    } catch (err) {
        console.error(err);
    }
}
