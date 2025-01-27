const AboutUs = () => {
    // Inline CSS for styling
    const styles = {
        container: {
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.6",
            color: "#333",
        },
        section: {
            padding: "40px 20px",
            margin: "20px 0",
            borderRadius: "8px",
            background: "#f9f9f9",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        },
        heroSection: {
            background: "#6b961f",
            color: "#fff",
            textAlign: "center",
            padding: "40px 20px",
        },
        heroHeader: {
            fontSize: "2.5rem",
            marginBottom: "10px",
        },
        heroText: {
            fontSize: "1.2rem",
        },
        sectionHeader: {
            color: "#6b961f",
            fontSize: "1.8rem",
            marginBottom: "15px",
        },
        list: {
            listStyleType: "disc",
            paddingLeft: "20px",
        },
        listItem: {
            marginBottom: "10px",
        },
        link: {
            color: "#6b961f",
            textDecoration: "none",
        },
        linkHover: {
            textDecoration: "underline",
        },
    };

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <section style={styles.heroSection}>
                <h1 style={styles.heroHeader}>About Us</h1>
                <p style={styles.heroText}>
                    Welcome to <strong>SkillSphere</strong>, your one-stop platform for connecting talented individuals with
                    the right opportunities. We aim to empower job seekers and employers alike, ensuring that everyone has a
                    chance to grow and succeed.
                </p>
            </section>

            {/* Mission Section */}
            <section style={styles.section}>
                <h2 style={styles.sectionHeader}>Our Mission</h2>
                <p>
                    Our mission is to bridge the gap between talent and opportunities by creating an inclusive, reliable,
                    and user-friendly platform. We believe in fostering meaningful connections that drive personal and
                    professional growth.
                </p>
            </section>

            {/* Values Section */}
            <section style={styles.section}>
                <h2 style={styles.sectionHeader}>Our Core Values</h2>
                <ul style={styles.list}>
                    <li style={styles.listItem}>
                        <strong>Integrity:</strong> We operate with honesty and transparency to build trust within our
                        community.
                    </li>
                    <li style={styles.listItem}>
                        <strong>Innovation:</strong> We strive to bring cutting-edge technology to streamline the hiring
                        process.
                    </li>
                    <li style={styles.listItem}>
                        <strong>Inclusivity:</strong> We welcome individuals from all backgrounds and experiences to join our
                        platform.
                    </li>
                    <li style={styles.listItem}>
                        <strong>Excellence:</strong> We are committed to delivering the best user experience and results.
                    </li>
                </ul>
            </section>

            {/* Team Section */}
            <section style={styles.section}>
                <h2 style={styles.sectionHeader}>Meet Our Team</h2>
                <p>
                    Our dedicated team of professionals works tirelessly to bring you the best platform for job and gig
                    opportunities. From developers to customer support, each member plays a vital role in ensuring your
                    experience is seamless.
                </p>
            </section>

            {/* Contact Section */}
            <section style={styles.section}>
                <h2 style={styles.sectionHeader}>Get in Touch</h2>
                <p>
                    Have questions or feedback? We`d love to hear from you! Reach out to us at{" "}
                    <a
                        href="mailto:support@skillsphere.com"
                        style={styles.link}
                        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                    >
                        support@skillsphere.com
                    </a>
                    .
                </p>
            </section>
        </div>
    );
};

export default AboutUs;
