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
            /*  set_image_data(imageBase64) */
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
                Usually each component which is marked as &lsquo;use
                client&lsquo; runs once on the server and then again on the
                client. This is Usually because we want to provide the user with
                something other than an empty component or all the work left to
                do on the client side. In this case though we want to show that
                the picture is fully loaded from the client.
                <br /> <br />
                To make this point clear, we will wrap the api call into a
                useEffect (which only runs on the client) and then add a timer
                in addition to show that the image loads after the component
                mounts and dynamically updates the client.
            </p>
            {display}
        </>
    )
}
