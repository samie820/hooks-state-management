import React from 'react';
import { Provider } from "./SongContext";

export default function withSongContext(Component) {
    return ((props) => {
            return (
                <Provider> 
                    <Component {...props}/>
                </Provider>
            )

        }
    )
}
