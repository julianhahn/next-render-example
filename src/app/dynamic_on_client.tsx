'use client'

import { useEffect, useState } from 'react'

export function Dynamic_on_Client({ url }: { url: string }) {
    const [image_data, set_image_data] = useState<string>('')

    // waits and extra second before fetching the url and then fetching the image on the client
    async function fetch_image() {
        setTimeout(async () => {
            const static_image = await fetch(url)
            const image_url = await static_image.json()
            const image_data = await fetch(image_url.message)
            const buffer = await image_data.arrayBuffer()
            const imageBase64 = Buffer.from(buffer).toString('base64')
            set_image_data(imageBase64)
        }, 1000)
    }

    useEffect(() => {
        fetch_image()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let display = null
    if (image_data === '') {
        display = <div className="loading-icon" />
    } else {
        console.log('setting image')
        display = (
            <img
                alt="puppi image dynamic"
                src={`data:image/jpeg;base64,${image_data}`}
            />
        )
    }

    return (
        <>
            <h3> Client Side Puppi Picture </h3>
            <p>
                Usually, a component marked as &lsquo;use client&lsquo; runs
                initially on the server and then again on the client. This is
                typically done to prevent presenting the user with an empty
                component or leaving all tasks to be completed on the client
                side. However, in this case, we want to demonstrate that the
                picture is fully loaded from the client.
                <br />
                <br />
                To highlight this, we will enclose the API call in a useEffect
                hook (which only operates on the client), and add a timer to
                show that the image is loaded after the component mounts,
                dynamically updating on the client side.
            </p>
            {display}
        </>
    )
}
