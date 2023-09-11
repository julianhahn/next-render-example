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
                This picture of a puppy is dynamically fetched from the server
                when a client makes a request. By default, the server caches
                this request and needs to be instructedif it shoud revalidate
                this data; the default is to not revalidate. If we would set a
                revalidation to 5 Minutes, this means that every 5 minutes,
                different clients will receive a different image of a puppy.
                This behavior can be altered; for instance, by instructing the
                fetch API not to use the cache and to rerun the API call with
                each client request, ensuring that each request retrieves a new
                image of a puppy.
            </p>
            <img
                alt="puppi image dynamic"
                src={`data:image/jpeg;base64,${imageBase64}`}
            ></img>
        </>
    )
}
