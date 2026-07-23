import { useState, useEffect } from "react";

const RTG_RED = "#C8102E";
const INK = "#1A1A1A";
const BG = "#FAFAF8";
const WARM = "#F0EBE3";
const RULE = "#E2E2E2";
const SUCCESS = "#1A6B3C";
const SUCCESS_BG = "#E8F5EE";

const PRODUCTS = {
  "RTG-001": {
    id: "RTG-001",
    name: "Cindy Crawford Bellingham Sectional",
    price: 1299,
    emoji: "🛋️",
    image:
      "https://assets.roomstogo.com/v2/37469880_3d-s-lr-hmri-8960-metropolisway-charcoal-sec-raf-ang_primary-view_hq_image-item.webp?cache-id=efaab5f1fef8dccf1e68825b39930d9e&w=1920&q=80",
    category: "Living Room",
    colors: ["Charcoal", "Ivory", "Slate Blue"],
    inStock: true,
    complements: ["RTG-003", "RTG-004"],
  },
  "RTG-002": {
    id: "RTG-002",
    name: "Platform Bed Frame — King",
    price: 849,
    emoji: "🛏️",
    image:
      "https://assets.roomstogo.com/product/natoma-brown-king-platform-bed_84200042_image-item?cache-id=97b094d4eaf8d8897512081a49962bee&w=1920&q=80",
    category: "Bedroom",
    colors: ["Espresso", "White", "Grey"],
    inStock: true,
    complements: ["RTG-005", "RTG-006"],
  },
  "RTG-003": {
    id: "RTG-003",
    name: "Lexington Coffee Table",
    price: 349,
    emoji: "🪵",
    image:
      "https://assets.roomstogo.com/v2/51011362_3d-s-lr-alek-825-walnut-haverhill-ang-ckt-tbl_primary-view_hq_image-item.webp?cache-id=3890399ac3809f2e81df066fcb397f5a&w=1920&q=80",
    category: "Living Room",
    colors: ["Walnut", "Black"],
    inStock: true,
    complements: ["RTG-001"],
  },
  "RTG-004": {
    id: "RTG-004",
    name: "Accent Armchair",
    price: 399,
    emoji: "🪑",
    image:
      "https://assets.roomstogo.com/v2/47770641_3d-s-lr-jgwf-457-beige-uptown-ang-chr_primary-view_hq_image-item.webp?cache-id=5d0853acd599cbcd6256b9a787482640&w=1920&q=80",
    category: "Living Room",
    colors: ["Cream", "Forest Green", "Terracotta"],
    inStock: false,
    complements: ["RTG-001"],
  },
  "RTG-005": {
    id: "RTG-005",
    name: "6-Drawer Dresser",
    price: 499,
    emoji: "🗄️",
    image:
      "https://assets.roomstogo.com/product/learitt-walnut-6-drawer-dresser_84800359_image-item?cache-id=6a4e22d60dc2d0eafba41875ee1dc586&w=1920&q=80",
    category: "Bedroom",
    colors: ["Espresso", "White"],
    inStock: true,
    complements: ["RTG-002"],
  },
  "RTG-006": {
    id: "RTG-006",
    name: "Nightstand Set (2pc)",
    price: 279,
    emoji: "🕯️",
    image:
      "https://assets.roomstogo.com/product/sagepark-white-nightstand-set-of-2_30525200_image-item?cache-id=b1ebf67488df10d9c89922128bc5715f&w=1920&q=80",
    category: "Bedroom",
    colors: ["Espresso", "White", "Grey"],
    inStock: true,
    complements: ["RTG-002"],
  },
};

const SCAN_SEQUENCE = ["RTG-001", "RTG-002", "RTG-003"];

const BARCODE_BARS = [3, 1, 2, 1, 4, 2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 1, 4, 2, 1, 3, 2, 1, 1];

// ─── Shared styles ────────────────────────────────────────────────────────────
const s = {
  screen: {
    fontFamily: "'Inter', sans-serif",
    minHeight: "100vh",
    background: BG,
    display: "flex",
    flexDirection: "column",
    maxWidth: 430,
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
  },
  header: {
    background: "#fff",
    borderBottom: `1px solid ${RULE}`,
    padding: "16px 20px 12px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  backBtn: {
    background: "none",
    border: "none",
    fontSize: 20,
    cursor: "pointer",
    padding: "0 4px",
    color: INK,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: INK,
    flex: 1,
  },
  scrollBody: {
    flex: 1,
    overflowY: "auto",
    padding: "20px 20px 40px",
  },
  btn: {
    background: RTG_RED,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "14px 20px",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  btnOutline: {
    background: "#fff",
    color: INK,
    border: `2px solid ${INK}`,
    borderRadius: 10,
    padding: "13px 20px",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  tag: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
  },
  mono: {
    fontFamily: "'DM Mono', monospace",
  },
};

// ─── Nav bar ─────────────────────────────────────────────────────────────────
function NavBar({ label, onBack, right }) {
  return (
    <div style={s.header}>
      {onBack && (
        <button style={s.backBtn} onClick={onBack}>
          ←
        </button>
      )}
      <span style={s.headerTitle}>{label}</span>
      {right}
    </div>
  );
}

// ─── Product thumbnail (real photo with emoji fallback) ───────────────────────
function Thumb({ product, size, fontSize, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        background: WARM,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
        cursor: onClick ? "pointer" : undefined,
      }}
    >
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.textContent = product.emoji;
          }}
        />
      ) : (
        <span style={{ fontSize }}>{product.emoji}</span>
      )}
    </div>
  );
}

// ─── Screen 1: Store Entry ────────────────────────────────────────────────────
function StoreEntryScreen({ onContinue }) {
  return (
    <div
      style={{
        ...s.screen,
        background: INK,
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 56, marginBottom: 20 }}>📍</div>
      <div
        style={{
          ...s.mono,
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: RTG_RED,
          marginBottom: 12,
        }}
      >
        Store Detected
      </div>
      <div
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 28,
          color: "#fff",
          lineHeight: 1.2,
          marginBottom: 12,
          fontWeight: 400,
        }}
      >
        Rooms To Go
        <br />
        Perimeter Atlanta
      </div>
      <div
        style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.5)",
          marginBottom: 40,
          lineHeight: 1.6,
        }}
      >
        Scan any product tag to save items, check availability, and build your
        room — all in one place.
      </div>
      <button style={{ ...s.btn, borderRadius: 12 }} onClick={onContinue}>
        Open Store Mode
      </button>
      <div
        style={{
          marginTop: 16,
          fontSize: 12,
          color: "rgba(255,255,255,0.3)",
        }}
      >
        Not now
      </div>
    </div>
  );
}

// ─── Screen 2: Store Home ─────────────────────────────────────────────────────
function StoreHomeScreen({ savedItems, recentScans, onScan, onViewRoom, onViewProduct }) {
  return (
    <div style={s.screen}>
      <div
        style={{
          background: RTG_RED,
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ ...s.mono, fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Store Mode Active
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>
            📍 Perimeter Atlanta
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <button
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 8,
              padding: "8px 14px",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={onViewRoom}
          >
            My Room
          </button>
          {savedItems.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                background: "#fff",
                color: RTG_RED,
                borderRadius: "50%",
                width: 18,
                height: 18,
                fontSize: 10,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {savedItems.length}
            </div>
          )}
        </div>
      </div>

      <div style={s.scrollBody}>
        <button style={{ ...s.btn, marginBottom: 24, borderRadius: 12, fontSize: 16 }} onClick={onScan}>
          📷 &nbsp; Scan a Product Tag
        </button>

        {recentScans.length > 0 && (
          <>
            <div
              style={{
                ...s.mono,
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#8A8A8A",
                marginBottom: 12,
              }}
            >
              Recently Scanned
            </div>
            {recentScans.map((id) => {
              const p = PRODUCTS[id];
              return (
                <div
                  key={id}
                  onClick={() => onViewProduct(id)}
                  style={{
                    background: "#fff",
                    border: `1px solid ${RULE}`,
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    cursor: "pointer",
                  }}
                >
                  <Thumb product={p} size={56} fontSize={32} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: RTG_RED, fontWeight: 700 }}>
                      ${p.price.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ color: "#ccc", fontSize: 18 }}>›</div>
                </div>
              );
            })}
          </>
        )}

        {recentScans.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#aaa",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏷️</div>
            Scan any tag on the showroom floor to see details, check stock, and save to your room.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Screen 3: Scanner ────────────────────────────────────────────────────────
function ScannerScreen({ onBack, onScanned, scanIndex }) {
  const [scanning, setScanning] = useState(false);
  const [found, setFound] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setFound(true);
      setTimeout(() => {
        const productId = SCAN_SEQUENCE[scanIndex % SCAN_SEQUENCE.length];
        onScanned(productId);
      }, 600);
    }, 1800);
  };

  return (
    <div style={{ ...s.screen, background: "#111" }}>
      <div
        style={{
          ...s.header,
          background: "#111",
          borderBottom: "1px solid #333",
        }}
      >
        <button style={{ ...s.backBtn, color: "#fff" }} onClick={onBack}>←</button>
        <span style={{ ...s.headerTitle, color: "#fff" }}>Scan Barcode</span>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        {/* Viewfinder */}
        <div
          style={{
            width: "100%",
            maxWidth: 320,
            height: 160,
            position: "relative",
            marginBottom: 32,
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "#222", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
            {found ? (
              <div style={{ fontSize: 52, animation: "pulse 0.3s ease" }}>✅</div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 44 }}>
                  {BARCODE_BARS.map((w, i) => (
                    <div
                      key={i}
                      style={{
                        width: w,
                        height: "100%",
                        background: "#555",
                      }}
                    />
                  ))}
                </div>
                <div style={{ ...s.mono, fontSize: 12, color: "#555", textAlign: "center" }}>
                  {scanning ? "Reading barcode..." : "Position barcode in frame"}
                </div>
              </>
            )}
          </div>

          {/* Corners */}
          {["tl", "tr", "bl", "br"].map((pos) => (
            <div
              key={pos}
              style={{
                position: "absolute",
                width: 32,
                height: 32,
                ...(pos === "tl" ? { top: 8, left: 8, borderTop: `3px solid ${RTG_RED}`, borderLeft: `3px solid ${RTG_RED}` } : {}),
                ...(pos === "tr" ? { top: 8, right: 8, borderTop: `3px solid ${RTG_RED}`, borderRight: `3px solid ${RTG_RED}` } : {}),
                ...(pos === "bl" ? { bottom: 8, left: 8, borderBottom: `3px solid ${RTG_RED}`, borderLeft: `3px solid ${RTG_RED}` } : {}),
                ...(pos === "br" ? { bottom: 8, right: 8, borderBottom: `3px solid ${RTG_RED}`, borderRight: `3px solid ${RTG_RED}` } : {}),
              }}
            />
          ))}

          {/* Scan line */}
          {scanning && !found && (
            <div
              style={{
                position: "absolute",
                left: "6%",
                right: "6%",
                height: 2,
                background: RTG_RED,
                boxShadow: `0 0 8px ${RTG_RED}`,
                animation: "scanline 1.2s ease-in-out infinite",
              }}
            />
          )}
        </div>

        {!scanning && !found && (
          <button
            style={{ ...s.btn, maxWidth: 280, borderRadius: 12 }}
            onClick={handleScan}
          >
            📷 &nbsp; Tap to Scan
          </button>
        )}

        {scanning && !found && (
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, textAlign: "center" }}>
            Scanning...
          </div>
        )}

        <div style={{ color: "#555", fontSize: 12, marginTop: 20, textAlign: "center", lineHeight: 1.6 }}>
          Hold the camera steady over the<br />barcode on the product tag
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0% { top: 12%; }
          50% { top: 82%; }
          100% { top: 12%; }
        }
      `}</style>
    </div>
  );
}

// ─── Screen 4: Product Detail ─────────────────────────────────────────────────
function ProductScreen({ productId, onBack, onSave, savedItems, onViewRoom }) {
  const p = PRODUCTS[productId];
  const [selectedColor, setSelectedColor] = useState(p.colors[0]);
  const isSaved = savedItems.some((i) => i.id === productId);
  const [justSaved, setJustSaved] = useState(false);

  const handleSave = () => {
    if (!isSaved) {
      onSave(productId);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  const complements = p.complements.map((id) => PRODUCTS[id]).filter(Boolean);

  return (
    <div style={s.screen}>
      <NavBar
        label=""
        onBack={onBack}
        right={
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: 13,
              fontWeight: 600,
              color: RTG_RED,
              cursor: "pointer",
            }}
            onClick={onViewRoom}
          >
            My Room ({savedItems.length})
          </button>
        }
      />

      <div style={s.scrollBody}>
        {/* Hero image */}
        <div
          style={{
            background: WARM,
            borderRadius: 16,
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 72,
            marginBottom: 20,
            overflow: "hidden",
          }}
        >
          {p.image ? (
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.textContent = p.emoji;
              }}
            />
          ) : (
            p.emoji
          )}
        </div>

        {/* Product info */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ ...s.mono, fontSize: 10, color: "#aaa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
            {p.category}
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{p.name}</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: RTG_RED, marginBottom: 12 }}>
            ${p.price.toLocaleString()}
          </div>

          {/* Availability */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 20,
              background: p.inStock ? SUCCESS_BG : "#FFF4E0",
              color: p.inStock ? SUCCESS : "#7A4F00",
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            {p.inStock ? "✓ In Stock at This Store" : "⚠ Check Other Locations"}
          </div>

          {/* Colors */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#8A8A8A", marginBottom: 8 }}>
              Color: <span style={{ color: INK }}>{selectedColor}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {p.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    border: `2px solid ${selectedColor === c ? INK : RULE}`,
                    background: selectedColor === c ? INK : "#fff",
                    color: selectedColor === c ? "#fff" : INK,
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Complete the Room */}
        {complements.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
              Complete the Room
            </div>
            {complements.map((cp) => (
              <div
                key={cp.id}
                style={{
                  background: "#fff",
                  border: `1px solid ${RULE}`,
                  borderRadius: 10,
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 8,
                  cursor: "pointer",
                }}
              >
                <Thumb product={cp} size={44} fontSize={24} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{cp.name}</div>
                  <div style={{ fontSize: 12, color: RTG_RED, fontWeight: 600 }}>${cp.price.toLocaleString()}</div>
                </div>
                <div style={{ fontSize: 12, color: RTG_RED, fontWeight: 600 }}>+ Add</div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            style={{
              ...s.btnOutline,
              flex: 1,
              borderColor: isSaved || justSaved ? SUCCESS : INK,
              color: isSaved || justSaved ? SUCCESS : INK,
            }}
            onClick={handleSave}
          >
            {justSaved ? "✓ Saved!" : isSaved ? "✓ Saved" : "♡ Save"}
          </button>
          <button style={{ ...s.btn, flex: 1 }}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 5: My Room ────────────────────────────────────────────────────────
function MyRoomScreen({ savedItems, onBack, onRemove, onViewProduct }) {
  const total = savedItems.reduce((sum, i) => sum + i.price, 0);
  const [notifSent, setNotifSent] = useState(false);

  return (
    <div style={s.screen}>
      <NavBar label={`My Room (${savedItems.length})`} onBack={onBack} />

      <div style={s.scrollBody}>
        {savedItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🛋️</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: INK, marginBottom: 8 }}>
              Your room is empty
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.6 }}>
              Scan product tags in the showroom to save items here.
            </div>
          </div>
        ) : (
          <>
            {savedItems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#fff",
                  border: `1px solid ${RULE}`,
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Thumb product={item} size={60} fontSize={36} onClick={() => onViewProduct(item.id)} />
                <div style={{ flex: 1, cursor: "pointer" }} onClick={() => onViewProduct(item.id)}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: RTG_RED, fontWeight: 700 }}>
                    ${item.price.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ccc",
                    fontSize: 18,
                    cursor: "pointer",
                    padding: 4,
                  }}
                >
                  ×
                </button>
              </div>
            ))}

            {/* Total */}
            <div
              style={{
                background: INK,
                borderRadius: 12,
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
                {savedItems.length} {savedItems.length === 1 ? "item" : "items"}
              </div>
              <div style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>
                ${total.toLocaleString()}
              </div>
            </div>

            <button style={{ ...s.btn, marginBottom: 10, borderRadius: 12 }}>
              Checkout All Items
            </button>

            {/* Share / notify */}
            <button
              style={{ ...s.btnOutline, borderRadius: 12, marginBottom: 10 }}
              onClick={() => {
                setNotifSent(true);
                setTimeout(() => setNotifSent(false), 3000);
              }}
            >
              {notifSent ? "✓ Link Copied!" : "🔗 Share Room with Partner"}
            </button>

            {notifSent && (
              <div
                style={{
                  background: SUCCESS_BG,
                  color: SUCCESS,
                  borderRadius: 10,
                  padding: "10px 16px",
                  fontSize: 13,
                  textAlign: "center",
                  fontWeight: 500,
                }}
              >
                Your saved room list link has been copied to clipboard.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Push Notification Overlay ────────────────────────────────────────────────
function PushNotif({ item, onDismiss, onOpen }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 32px)",
        maxWidth: 390,
        background: "rgba(26,26,26,0.95)",
        backdropFilter: "blur(12px)",
        borderRadius: 16,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        zIndex: 1000,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        cursor: "pointer",
      }}
      onClick={onOpen}
    >
      <div style={{ fontSize: 28 }}>🛋️</div>
      <div style={{ flex: 1 }}>
        <div style={{ ...s.mono, fontSize: 10, color: RTG_RED, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>
          Rooms To Go
        </div>
        <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, marginBottom: 2 }}>
          Still thinking about the {item.name.split(" ").slice(0, 3).join(" ")}?
        </div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
          It's in your saved room. Tap to continue.
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onDismiss(); }}
        style={{ background: "none", border: "none", color: "#555", fontSize: 18, cursor: "pointer" }}
      >
        ×
      </button>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("entry");
  const [savedItems, setSavedItems] = useState([]);
  const [recentScans, setRecentScans] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [scanCount, setScanCount] = useState(0);
  const [showNotif, setShowNotif] = useState(false);
  const [prevScreen, setPrevScreen] = useState(null);

  const go = (next) => {
    setPrevScreen(screen);
    setScreen(next);
  };

  const goBack = () => {
    setScreen(prevScreen || "home");
    setPrevScreen(null);
  };

  const handleScanned = (productId) => {
    setCurrentProduct(productId);
    setRecentScans((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, 5));
    setScanCount((c) => c + 1);
    go("product");
  };

  const handleSave = (productId) => {
    const p = PRODUCTS[productId];
    if (!savedItems.some((i) => i.id === productId)) {
      setSavedItems((prev) => [...prev, p]);
      // Show push notif after 3s to simulate re-engagement
      if (savedItems.length === 0) {
        setTimeout(() => setShowNotif(true), 3000);
      }
    }
  };

  const handleRemove = (productId) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== productId));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#e8e8e8", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 0 }}>
      <div style={{ width: "100%", maxWidth: 430, minHeight: "100vh", background: BG, position: "relative", boxShadow: "0 0 40px rgba(0,0,0,0.15)" }}>

        {showNotif && savedItems.length > 0 && (
          <PushNotif
            item={savedItems[0]}
            onDismiss={() => setShowNotif(false)}
            onOpen={() => { setShowNotif(false); go("room"); }}
          />
        )}

        {screen === "entry" && (
          <StoreEntryScreen onContinue={() => go("home")} />
        )}
        {screen === "home" && (
          <StoreHomeScreen
            savedItems={savedItems}
            recentScans={recentScans}
            onScan={() => go("scanner")}
            onViewRoom={() => go("room")}
            onViewProduct={(id) => { setCurrentProduct(id); go("product"); }}
          />
        )}
        {screen === "scanner" && (
          <ScannerScreen
            onBack={goBack}
            onScanned={handleScanned}
            scanIndex={scanCount}
          />
        )}
        {screen === "product" && currentProduct && (
          <ProductScreen
            productId={currentProduct}
            onBack={goBack}
            onSave={handleSave}
            savedItems={savedItems}
            onViewRoom={() => go("room")}
          />
        )}
        {screen === "room" && (
          <MyRoomScreen
            savedItems={savedItems}
            onBack={goBack}
            onRemove={handleRemove}
            onViewProduct={(id) => { setCurrentProduct(id); go("product"); }}
          />
        )}
      </div>
    </div>
  );
}
