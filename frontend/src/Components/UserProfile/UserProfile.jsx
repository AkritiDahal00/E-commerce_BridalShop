// UserProfile.jsx
import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link ,  useNavigate } from 'react-router-dom';

const UserProfile = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [hasPurchases, setHasPurchases] = useState(false);
    const {product}=props;
    const {addTopurchaseHistoryt}=useContext(ShopContext);
    const navigate = useNavigate();


    const navigatetopurchase = () => {
        navigate('../purchasehistory');// Navigate to the '/profile' route
      };
    useEffect(() => {
        fetchUserProfile();
    }, []);
    useEffect(() => {
        fetchPurchaseHistory();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('http://localhost:4000/profileview', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token') // Assuming token is stored in localStorage
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                console.log(data.user);
            } else {
                console.error('Failed to fetch user profile');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    
    const fetchPurchaseHistory = async () => {
        try {
            const response = await fetch('/purchase-history');
            if (response.ok) {
                const data = await response.json();
                setPurchaseHistory(data.purchases);
            } else {
                console.error('Failed to fetch purchase history');
            }
        } catch (error) {
            console.error('Error fetching purchase history:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to view your profile</div>;
    }

   
   


    return (
        <div>
            <h1>User Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>PendingList: {user.cartdata}</p>
            
           <p></p>
           {/* <button className="seepurchasedata" onClick={()=>{addTopurchaseHistoryt(product.id)}}>Your Purchase Data</button> */}
           {/* <Link to='/purchasehistory'> */}
            <button className='seepurchasedata' onClick={navigatetopurchase}>See your purchase data</button>
           {/* </Link> */}
           <div>
            <h2>Purchase History</h2>
            <ul>
              
            </ul>
        </div>
        </div>
       
    );
};

export default UserProfile;
