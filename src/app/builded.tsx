export async function Builded({ url }: { url: string }) {
    const static_image = await fetch(url)
    const image_url = await static_image.json()
    const image_data = await fetch(image_url.message)
    const buffer = await image_data.arrayBuffer()
    const imageBase64 = Buffer.from(buffer).toString('base64')

    return (
        <>
            <h3> Builded Puppi Picture </h3>
            <p>
                This picture of a puppy was loaded from the API during the build
                time and is used in this component. It remains the same for all
                clients and is not dynamic in any way, meaning it is static.
            </p>
            <img
                alt="puppi image dynamic"
                src={`data:image/jpeg;base64,${imageBase64}`}
            ></img>
        </>
    )
}
