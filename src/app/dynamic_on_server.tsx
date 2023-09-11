export async function Dynamic_on_Server({ url }: { url: string }) {
    // load the image
    const static_image = await fetch(url, { cache: 'no-cache' })
    const image_url = await static_image.json()
    const image_data = await fetch(image_url.message)
    const buffer = await image_data.arrayBuffer()
    const imageBase64 = Buffer.from(buffer).toString('base64')

    return (
        <>
            <h3> Dynamic Puppi Picture </h3>
            <p>
                this ppicture of a puppi was dynamically fetched on the server
                when a client made a request to the server. The server caches
                this request by default and needs to be told when to revalidate
                this data. The default is 5 minutes I think. This means that
                every 5 minutes apart clients would get a different puppi. We
                can alter this behaviour for example inf forcing the fetch api
                to not use the cache and rerun the api call on each client
                request. This would mean that on every request there would be
                another puppi.
            </p>
            <img
                alt="puppi image dynamic"
                src={`data:image/jpeg;base64,${imageBase64}`}
            ></img>
        </>
    )
}
