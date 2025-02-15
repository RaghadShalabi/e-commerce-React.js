import React, { useContext, useEffect } from 'react'
import SomeCategory from '../someCategory/SomeCategory.jsx'
import { UserContext } from '../../../components/user/context/UserContext.jsx';

export default function Home() {
    return (
        <div>
            <SomeCategory />
        </div>
    )
}
