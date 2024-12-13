import React, { useState } from 'react';
import Sidebar from '../dashboard/componnet/Navbar';  // Correction du nom
import Produits from '../dashboard/componnet/Produits';
import Commandes from '../dashboard/componnet/Commandes';
import Clients from '../dashboard/componnet/Clients';
import Header from '../dashboard/componnet/Header';
import MainContent from '../dashboard/componnet/MainContent';

export default function Dashboard() {
    const [activePage, setActivePage] = useState('Dashboard');

    const renderContent = () => {
        switch (activePage) {
            case 'MainContent':
                return <div className="p-6"><MainContent /></div>;
            case 'Produits':
                return <Produits />;
            case 'Commandes':
                return <Commandes />;
            case 'Clients':
                return <Clients />;
            default:
                return <div className="p-6"><MainContent /></div>;
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar setActivePage={setActivePage} />  {/* Ensure Sidebar uses setActivePage correctly */}
            <div className="flex-grow">
                <Header />
                {renderContent()}  {/* Dynamically render the page content */}
            </div>
        </div>
    );
}
