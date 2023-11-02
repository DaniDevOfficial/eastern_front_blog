import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './homePage';

export function Wrapper() {

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        

        </>
    )
}