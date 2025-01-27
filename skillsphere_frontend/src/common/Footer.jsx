const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#008000', color: '#fff', padding: '20px', textAlign: 'center' }}>
            <div>
                <h3>SKILL SPHERE</h3>
            </div>
            <div style={{ marginTop: '20px' }}>
                <a href="/aboutus" style={{ color: '#fff', margin: '0 10px' }}>About Us</a>
                <a href="/faq" style={{ color: '#fff', margin: '0 10px' }}>Faq</a>
                <a href="#" style={{ color: '#fff', margin: '0 10px' }}>Help & Support</a>
                <a href="#" style={{ color: '#fff', margin: '0 10px' }}>Blog</a>
                <a href="#" style={{ color: '#fff', margin: '0 10px' }}>Contact Us</a>
            </div>
        </footer>
    );
};

export default Footer;
