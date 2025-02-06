import React from 'react'
import CustomSidebar from '../../../components/user/sidebar/customSidebar.jsx'
import { Outlet } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'


export default function Profile() {
    return (
        <>
            <Container fluid className='p-0'>
                <Row >
                    <Col md={3}>
                        <CustomSidebar />
                    </Col>
                    <Col md={8} className='p-0'>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
