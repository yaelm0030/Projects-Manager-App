// Small helper around fetch: sends/receives JSON and throws on errors.
const request = async (method, url, body) => {
    const res = await fetch(`/api${url}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message || "Request failed")
    }
    return data
}

export const get = (url) => request("GET", url)
export const post = (url, body) => request("POST", url, body)
export const put = (url, body) => request("PUT", url, body)
export const patch = (url, body) => request("PATCH", url, body)
export const del = (url) => request("DELETE", url)
