import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Card, Spinner, Container, Row, Col } from 'react-bootstrap';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/order`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      console.log(response.data.orders);

      if (response.status === 200) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    const token = localStorage.getItem('userToken');
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/order/cancel/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      console.log(response.data);

      if (response.status === 200) {
        toast.success('Order canceled successfully', {
          position: 'top-right',
          autoClose: 3000,
          theme: 'dark',
        });
        getOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel the order', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark',
      });
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container className="my-5">
      <h3 className="text-center mb-4" style={{ color: '#FFCF50', fontWeight: 'bold' }}>Orders List</h3>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" style={{ color: '#000000' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {orders.map((order, index) => (
            <Col key={order._id} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm" style={{ borderRadius: '10px', border: 'none' }}>
                <Card.Body>
                  <Card.Title style={{ color: '#343a40', fontWeight: 'bold' }}>
                    Order ID: {index + 1}
                  </Card.Title>
                  <Card.Text>
                    <strong>Status:</strong>{' '}
                    <span
                      style={{
                        color:
                          order.status === 'cancelled'
                            ? '#dc3545'
                            : order.status === 'deliverd'
                              ? '#28a745'
                              : '#007bff',
                        fontWeight: '500',
                      }}
                    >
                      {order.status}
                    </span>
                  </Card.Text>
                  <Card.Text>
                    <strong>Address:</strong> {order.address}
                  </Card.Text>
                  <Card.Text>
                    <strong>Phone:</strong> {order.phoneNumber}
                  </Card.Text>
                  <Card.Text>
                    <strong>Coupon Name:</strong> {order.couponName ? order.couponName : "No coupon applied"}
                  </Card.Text>
                  <Card.Text>
                    <strong>Final Price:</strong> ${order.finalPrice}
                  </Card.Text>
                  <Button
                    variant={order.status === 'cancelled' ? 'secondary' : 'danger'}
                    onClick={() => cancelOrder(order._id)}
                    disabled={order.status === 'cancelled'}
                    className="w-100"
                    style={{
                      borderRadius: '5px',
                      fontWeight: '500',
                      backgroundColor: order.status === 'cancelled' ? '#6c757d' : '#dc3545',
                      border: 'none',
                    }}
                  >
                    {order.status === 'cancelled' ? 'Order Cancelled' : 'Cancel Order'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}