function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>🌍 Welcome to Travel Diaries</h1>
      <p style={{ fontSize: "1.2rem", margin: "20px 0" }}>
        Discover breathtaking journeys, share your adventures,
        and get inspired by fellow travelers ✈️
      </p>
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Travel"
        style={{
          maxWidth: "100%",
          borderRadius: "16px",
          marginTop: "20px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.2)"
        }}
      />
    </div>
  );
}

export default Home;
