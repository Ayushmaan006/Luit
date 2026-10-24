import { Cafe } from '../types/cafe.ts';
import { createWeeklyHours } from '../utils/hours.ts';

export const INITIAL_CAFES: Cafe[] = [
  {
    id: 'steaming-mug-uzanbazar',
    name: 'The Steaming Mug',
    tagline: 'Vintage colonial bookstore cafe nestled by the quiet lanes of Latasil & Uzan Bazar',
    neighborhood: 'Uzan Bazar & Latasil',
    address: 'Club Road, Near Latasil Playground, Uzan Bazar, Guwahati, Assam 781001',
    landmark: 'Opposite Vivekananda Kendra / Near Latasil Field',
    mapsQuery: 'The Steaming Mug Uzan Bazar Guwahati',
    coordinates: { lat: 26.1905, lng: 91.7538 },
    cuisineTypes: ['Continental', 'Specialty Coffee & Tea', 'Bakery & Artisanal Desserts'],
    vibes: ['Quiet Study', 'Romantic Date', 'Family Friendly'],
    priceRange: '₹₹',
    costForTwo: 550,
    hasWifi: true,
    wifiSpeedDesc: '75 Mbps fiber with dedicated work tables',
    hasOutdoorSeating: true,
    outdoorType: 'Quiet Verandah with heritage planter chairs',
    isPetFriendly: true,
    timings: '10:00 AM – 10:30 PM',
    dailyHours: createWeeklyHours('10:00 AM', '10:30 PM'),
    phone: '+91 361 254 8890',
    instagram: '@thesteamingmug_ghy',
    coverImage: '/src/assets/images/cafe_uzanbazar_heritage_1792856939619.jpg',
    galleryImages: [
      {
        id: 'sm-g1',
        url: '/src/assets/images/cafe_uzanbazar_heritage_1792856939619.jpg',
        caption: 'Cozy bookstore reading corner with warm timber lamps',
        category: 'Ambience',
        uploadedBy: 'Luit Brew Editorial',
        date: 'Oct 2026'
      },
      {
        id: 'sm-g2',
        url: '/src/assets/images/cafe_artisan_pour_over_1792856939697.jpg',
        caption: 'Handcrafted pour-overs using Karbi Anglong Arabica beans',
        category: 'Food & Drink',
        uploadedBy: 'Barista Himangshu',
        date: 'Sep 2026'
      }
    ],
    menuCategories: [
      {
        category: 'Artisanal Teas & Specialty Brews',
        items: [
          {
            name: 'Assam Orthodox Golden Tips (First Flush)',
            price: 160,
            description: 'Hand-plucked tender leaf tips from Dibrugarh estate with a honeyed muscatel finish.',
            isVeg: true,
            isSignature: true
          },
          {
            name: 'Kazi Nemu Cold Brew',
            price: 210,
            description: '18-hour cold brew infused with fresh indigenous Assam lemon essence and mint.',
            isVeg: true,
            isSignature: true
          },
          {
            name: 'Classic Aeropress Karbi Arabica',
            price: 190,
            description: 'Single-origin washed beans from Karbi Anglong hills, chocolatey and smooth.',
            isVeg: true
          },
          {
            name: 'Spiced Kadak Masala Chai Pot',
            price: 130,
            description: 'Slow-simmered Assam CTC tea with green cardamom, ginger, and black pepper.',
            isVeg: true
          }
        ]
      },
      {
        category: 'All-Day Bistro & Bakery',
        items: [
          {
            name: 'Uzan Bazar Grilled Cheese & Smoked Herb Melt',
            price: 260,
            description: 'Aged cheddar, mozzarella, and local garden herbs in sourdough bread with tomato relish.',
            isVeg: true
          },
          {
            name: 'Bhut Jolokia Spiced Chicken Bagel',
            price: 320,
            description: 'Toasted sesame bagel, pulled smoked chicken with a mild ghost pepper infused glaze.',
            isVeg: false,
            isSignature: true
          },
          {
            name: 'Blueberry & Assam Honey French Toast',
            price: 280,
            description: 'Thick brioche slices soaked in vanilla batter, served with wild honey and berry compote.',
            isVeg: true
          },
          {
            name: 'Warm Walnut Brownie with Jaggery Gelato',
            price: 240,
            description: 'Fudgy dark chocolate brownie topped with artisan organic jaggery ice cream.',
            isVeg: true
          }
        ]
      }
    ],
    menuImages: [],
    rating: 4.8,
    reviewsCount: 38,
    reviews: [
      {
        id: 'rev-sm-1',
        userName: 'Priyanka Sarma',
        rating: 5,
        date: '2026-10-18',
        comment: 'One of my favorite places in Guwahati to sit for hours with a novel. The Kazi Nemu cold brew is unmatched and the rain against the large windows is pure peace.',
        visitType: 'Solo Reading'
      },
      {
        id: 'rev-sm-2',
        userName: 'Arindam Barua',
        rating: 5,
        date: '2026-10-10',
        comment: 'Great Wi-Fi, plenty of power points, and staff is courteous without hovering. Fantastic artisan pour-over coffee.',
        visitType: 'Work & Study'
      }
    ],
    specialties: ['Assam Orthodox First Flush', 'Kazi Nemu Cold Brew', 'Bhut Jolokia Chicken Bagel', 'Vintage Bookstore Nook'],
    features: ['High-speed Wi-Fi', 'Power Outlets', 'Quiet Reading Corner', 'Pet Friendly Patio', 'Artisan Bakery']
  },
  {
    id: 'heritage-brahmaputra-panbazar',
    name: 'Heritage Brahmaputra Riverfront Cafe',
    tagline: 'Panoramic riverbank deck overlooking the majestic Brahmaputra with spectacular sunset views',
    neighborhood: 'Panbazar & Riverfront',
    address: 'Mahabahu Brahmaputra Heritage Centre, Panbazar Ghat, Guwahati, Assam 781001',
    landmark: 'Inside Mahabahu Riverfront Heritage Precinct, Old DC Bungalow',
    mapsQuery: 'Mahabahu Brahmaputra River Heritage Centre Cafe Guwahati',
    coordinates: { lat: 26.1912, lng: 91.7455 },
    cuisineTypes: ['Assamese & Regional Fusion', 'Continental', 'Specialty Coffee & Tea'],
    vibes: ['Scenic Vistas', 'Romantic Date', 'Family Friendly'],
    priceRange: '₹₹₹',
    costForTwo: 950,
    hasWifi: true,
    wifiSpeedDesc: '50 Mbps Wi-Fi available across deck and garden',
    hasOutdoorSeating: true,
    outdoorType: 'Panoramic Wooden River Deck with Brahmaputra sunset vista',
    isPetFriendly: true,
    timings: '11:00 AM – 10:00 PM (Closed Mondays)',
    dailyHours: createWeeklyHours('11:00 AM', '10:00 PM', ['Monday']),
    phone: '+91 361 273 4511',
    instagram: '@heritagebrahmaputra_cafe',
    coverImage: '/src/assets/images/hero_guwahati_river_cafe_1792856938034.jpg',
    galleryImages: [
      {
        id: 'hb-g1',
        url: '/src/assets/images/hero_guwahati_river_cafe_1792856938034.jpg',
        caption: 'Brahmaputra river sunset deck with glowing fairy lights',
        category: 'View',
        uploadedBy: 'Luit Brew Editorial',
        date: 'Oct 2026'
      }
    ],
    menuCategories: [
      {
        category: 'Heritage High Tea & Regional Bites',
        items: [
          {
            name: 'Smoked Pork Bao with Fermented Bamboo Shoot Dip',
            price: 360,
            description: 'Steamed fluffy lotus bao buns packed with slow-smoked pork belly and Naga herbs.',
            isVeg: false,
            isSignature: true
          },
          {
            name: 'Silghat Estate Royal White Tea',
            price: 220,
            description: 'Delicate sun-dried silver needle buds with subtle floral fragrance.',
            isVeg: true,
            isSignature: true
          },
          {
            name: 'Assam Black Sesame (Til) Crusted Chicken Strips',
            price: 340,
            description: 'Crispy fried chicken strips rolled in roasted black sesame seeds with tangy lime dip.',
            isVeg: false
          },
          {
            name: 'Panbazar High-Tea Tier for Two',
            price: 680,
            description: 'Assorted petit four sandwiches, smoked duck pinwheels, scones with orange marmalade, and pot of tea.',
            isVeg: false
          }
        ]
      },
      {
        category: 'Continental & Coffee Bar',
        items: [
          {
            name: 'Smoked Salmon & Cream Cheese Bruschetta',
            price: 420,
            description: 'Artisanal baguette toasted with dill-infused cream cheese and capers.',
            isVeg: false
          },
          {
            name: 'Brahmaputra Sunset Iced Espresso Tonic',
            price: 240,
            description: 'Double espresso pulled over sparkling tonic, pink grapefruit syrup and rosemary.',
            isVeg: true,
            isSignature: true
          }
        ]
      }
    ],
    menuImages: [],
    rating: 4.9,
    reviewsCount: 64,
    reviews: [
      {
        id: 'rev-hb-1',
        userName: 'Tanmoy Saikia',
        rating: 5,
        date: '2026-10-21',
        comment: 'Hands down the most picturesque spot in the entire Northeast. Sit on the upper deck around 5 PM to watch ferries cross the Brahmaputra under the golden sky.',
        visitType: 'Sunset Date'
      },
      {
        id: 'rev-hb-2',
        userName: 'Manash Das',
        rating: 5,
        date: '2026-10-14',
        comment: 'The smoked pork baos are heavenly, and the white tea service is deeply authentic. Excellent place to bring visiting guests.',
        visitType: 'Family Outing'
      }
    ],
    specialties: ['Brahmaputra Sunset Views', 'Smoked Pork Bao', 'Royal White Tea', 'High-Tea Platter'],
    features: ['Scenic Riverfront Deck', 'Heritage Architecture', 'Outdoor Garden', 'Valet Parking', 'Wheelchair Accessible']
  },
  {
    id: 'terra-mayaa-gsroad',
    name: 'Terra Mayaa Cafe & Sky Lounge',
    tagline: 'Vibrant rooftop terrace and culinary lounge towering over the bustling GS Road corridor',
    neighborhood: 'GS Road & Christian Basti',
    address: '6th Floor, Anil Plaza II, ABC Point, GS Road, Christian Basti, Guwahati, Assam 781005',
    landmark: 'Above Anil Plaza II / Near Rajiv Bhawan',
    mapsQuery: 'Terra Mayaa Cafe GS Road Guwahati',
    coordinates: { lat: 26.1558, lng: 91.7765 },
    cuisineTypes: ['Continental', 'Italian & Pizza', 'Pan-Asian'],
    vibes: ['Lively Social', 'Romantic Date', 'Scenic Vistas'],
    priceRange: '₹₹₹',
    costForTwo: 1200,
    hasWifi: true,
    wifiSpeedDesc: '100 Mbps high-speed connection',
    hasOutdoorSeating: true,
    outdoorType: 'Panoramic Open-air Skyline Terrace with Shillong hill views',
    isPetFriendly: false,
    timings: '12:00 PM – 11:30 PM',
    dailyHours: createWeeklyHours('12:00 PM', '11:30 PM'),
    phone: '+91 361 246 8000',
    instagram: '@terramayaa_ghy',
    coverImage: '/src/assets/images/cafe_rooftop_sunset_brew_1792856939896.jpg',
    galleryImages: [
      {
        id: 'tm-g1',
        url: '/src/assets/images/cafe_rooftop_sunset_brew_1792856939896.jpg',
        caption: 'Skyline terrace overlooking the dusk lights and rolling hill horizon',
        category: 'Ambience',
        uploadedBy: 'Luit Brew Editorial',
        date: 'Oct 2026'
      }
    ],
    menuCategories: [
      {
        category: 'Woodfired Neapolitan Pizzas',
        items: [
          {
            name: 'Burrata & San Marzano Margherita',
            price: 520,
            description: '48-hour fermented dough, San Marzano tomato sugo, creamy burrata ball and fresh basil.',
            isVeg: true,
            isSignature: true
          },
          {
            name: 'Spicy Pepperoni & Naga Chilli Drizzle',
            price: 610,
            description: 'Imported pork pepperoni, fior di latte, and house chili-infused honey.',
            isVeg: false,
            isSignature: true
          }
        ]
      },
      {
        category: 'Artisan Beverages & Tapas',
        items: [
          {
            name: 'Cascara Citrus Iced Tonic',
            price: 260,
            description: 'Brewed coffee cherry husk infusion with tonic water, rosemary, and orange zest.',
            isVeg: true
          },
          {
            name: 'Crispy Truffle Parmesan Fries',
            price: 340,
            description: 'Hand-cut potato fries tossed in white truffle oil, shaved parmesan, and parsley dip.',
            isVeg: true
          }
        ]
      }
    ],
    menuImages: [],
    rating: 4.7,
    reviewsCount: 82,
    reviews: [
      {
        id: 'rev-tm-1',
        userName: 'Debojit Choudhury',
        rating: 5,
        date: '2026-10-19',
        comment: 'Best rooftop evening vibe on GS Road. The breeze, the music playlist, and the spicy pepperoni pizza make it a weekend staple.',
        visitType: 'Evening with Friends'
      }
    ],
    specialties: ['Woodfired Neapolitan Pizza', 'Cascara Iced Tonic', 'Skyline Sunset', 'Craft Cocktails & Mocktails'],
    features: ['Open-air Rooftop', 'Full Bar Available', 'DJ & Acoustic Nights', 'High-Speed Wi-Fi', 'Elevator Access']
  },
  {
    id: 'bean-journal-zooroad',
    name: 'Bean Journal Cafe & Roastery',
    tagline: 'Minimalist Nordic-Japanese specialty coffee roastery dedicated to precision pour-overs and deep work',
    neighborhood: 'Zoo Road & Bhangagarh',
    address: 'Zoo Tiniali, Near Assam State Zoo Gate, Zoo Road, Guwahati, Assam 781024',
    landmark: '200m from State Zoo Entrance / Above Green Leaf Mart',
    mapsQuery: 'Bean Journal Cafe Zoo Road Guwahati',
    coordinates: { lat: 26.1662, lng: 91.7820 },
    cuisineTypes: ['Specialty Coffee & Tea', 'Continental', 'Bakery & Artisanal Desserts'],
    vibes: ['Quiet Study', 'Lively Social'],
    priceRange: '₹₹',
    costForTwo: 500,
    hasWifi: true,
    wifiSpeedDesc: '200 Mbps fiber optic with power sockets at every desk',
    hasOutdoorSeating: false,
    isPetFriendly: true,
    timings: '08:30 AM – 09:30 PM',
    dailyHours: createWeeklyHours('08:30 AM', '09:30 PM'),
    phone: '+91 94350 99821',
    instagram: '@beanjournal_roasters',
    coverImage: '/src/assets/images/cafe_artisan_pour_over_1792856939697.jpg',
    galleryImages: [
      {
        id: 'bj-g1',
        url: '/src/assets/images/cafe_artisan_pour_over_1792856939697.jpg',
        caption: 'Manual brewing station with V60, Kalita Wave, and siphon gear',
        category: 'Food & Drink',
        uploadedBy: 'Bean Journal Head Roaster',
        date: 'Oct 2026'
      }
    ],
    menuCategories: [
      {
        category: 'Specialty Coffee Bar (Single Origin)',
        items: [
          {
            name: 'V60 Pour-Over: Meghalaya Khasi Hills Honey Process',
            price: 220,
            description: 'Notes of red plum, wild jasmine blossom, and sugarcane sweetness.',
            isVeg: true,
            isSignature: true
          },
          {
            name: 'Spanish Cortado with Condensed Milk',
            price: 180,
            description: 'Double espresso cut with equal warm textured milk and a drop of sweetened milk.',
            isVeg: true
          },
          {
            name: 'Kyoto-Style Slow Drip Cold Brew',
            price: 240,
            description: 'Extracted drop-by-drop over 12 hours. Incredibly clean with winey cocoa finish.',
            isVeg: true,
            isSignature: true
          },
          {
            name: 'Matcha Vanilla Cloud Latte',
            price: 230,
            description: 'Uji ceremonial grade matcha whisked with oat milk and velvety cold foam.',
            isVeg: true
          }
        ]
      },
      {
        category: 'Bakes & Light Brunches',
        items: [
          {
            name: 'House Sourdough Avocado Tartine',
            price: 310,
            description: 'Crushed Hass avocado, cherry tomatoes, za’atar spice, and lemon olive oil on grilled sourdough.',
            isVeg: true
          },
          {
            name: 'Almond & Pistachio Frangipane Tart',
            price: 210,
            description: 'Flaky buttery crust filled with rich nut frangipane and topped with toasted almonds.',
            isVeg: true
          }
        ]
      }
    ],
    menuImages: [],
    rating: 4.9,
    reviewsCount: 52,
    reviews: [
      {
        id: 'rev-bj-1',
        userName: 'Raktim Hazarika',
        rating: 5,
        date: '2026-10-23',
        comment: 'As a remote software developer, this is my temple in Guwahati. Rock-solid 200Mbps internet, quiet ambient lo-fi music, and the V60 brew is genuinely world-class.',
        visitType: 'Work & Study'
      }
    ],
    specialties: ['Khasi Hills Single Origin V60', 'Kyoto Cold Brew', 'Matcha Cloud Latte', 'Sourdough Tartines'],
    features: ['200 Mbps Fiber Wi-Fi', 'Charging Sockets at Every Table', 'Quiet Work Atmosphere', 'Single-Origin Coffee Roaster', 'Pet Friendly']
  },
  {
    id: 'cafe-hendrix-gsroad',
    name: 'Cafe Hendrix',
    tagline: 'Guwahati’s legendary rock & blues music cafe with hearty burgers, cold sodas, and acoustic gigs',
    neighborhood: 'GS Road & Christian Basti',
    address: 'Opposite Down Town Hospital, GS Road, Dispur, Guwahati, Assam 781006',
    landmark: 'Directly opposite Down Town Hospital',
    mapsQuery: 'Cafe Hendrix GS Road Guwahati',
    coordinates: { lat: 26.1384, lng: 91.7960 },
    cuisineTypes: ['Fast Food & Snacks', 'Continental', 'Assamese & Regional Fusion'],
    vibes: ['Lively Social', 'Live Music & Arts'],
    priceRange: '₹₹',
    costForTwo: 650,
    hasWifi: true,
    wifiSpeedDesc: '40 Mbps public Wi-Fi',
    hasOutdoorSeating: false,
    isPetFriendly: false,
    timings: '01:00 PM – 11:00 PM',
    dailyHours: createWeeklyHours('01:00 PM', '11:00 PM'),
    phone: '+91 361 222 9876',
    instagram: '@cafe_hendrix_official',
    coverImage: '/src/assets/images/cafe_uzanbazar_heritage_1792856939619.jpg',
    galleryImages: [
      {
        id: 'ch-g1',
        url: '/src/assets/images/cafe_uzanbazar_heritage_1792856939619.jpg',
        caption: 'Walls adorned with legendary guitars, vinyl records, and rock posters',
        category: 'Ambience',
        uploadedBy: 'Cafe Hendrix',
        date: 'Sep 2026'
      }
    ],
    menuCategories: [
      {
        category: 'Rockers Gourmet Burgers & Bites',
        items: [
          {
            name: 'The Voodoo Child Double Bacon Cheeseburger',
            price: 360,
            description: 'Juicy char-grilled patty with melted cheddar, crispy bacon, and smoky BBQ aioli.',
            isVeg: false,
            isSignature: true
          },
          {
            name: 'Jimi’s Crispy Chicken Tenders with Naga Honey Glaze',
            price: 290,
            description: 'Golden fried chicken tenders tossed in a spicy-sweet local honey drizzle.',
            isVeg: false,
            isSignature: true
          },
          {
            name: 'Smoked Pork Sausage Platter',
            price: 340,
            description: 'Assamese smoked pork sausages served with spicy mustard and pickled cucumbers.',
            isVeg: false
          },
          {
            name: 'Hendrix Loaded Cheese Nachos',
            price: 260,
            description: 'Crisp tortilla chips baked with jalapeños, salsa, sour cream, and queso.',
            isVeg: true
          }
        ]
      },
      {
        category: 'Shakes, Coolers & Brews',
        items: [
          {
            name: 'Electric Blues Thick Shake',
            price: 190,
            description: 'Blue curacao flavored cream shake with vanilla ice cream and whipped cream.',
            isVeg: true
          },
          {
            name: 'Irish Cream Iced Coffee',
            price: 210,
            description: 'Chilled espresso shaken with Irish cream syrup and rich milk.',
            isVeg: true
          }
        ]
      }
    ],
    menuImages: [],
    rating: 4.6,
    reviewsCount: 71,
    reviews: [
      {
        id: 'rev-ch-1',
        userName: 'Bikram Kalita',
        rating: 5,
        date: '2026-10-15',
        comment: 'An institution for Northeast music lovers. Live acoustic sets on weekends are pure joy, and the bacon burgers never fail.',
        visitType: 'Live Music Night'
      }
    ],
    specialties: ['Live Blues & Rock Gigs', 'Voodoo Child Burger', 'Naga Honey Chicken Tenders', 'Smoked Pork Sausages'],
    features: ['Live Music Stage', 'Late Evening Hours', 'Iconic Music Memorabilia', 'Air Conditioned', 'Card & UPI Payments']
  },
  {
    id: '11th-avenue-dighalipukhuri',
    name: '11th Avenue Cafe Bistro',
    tagline: 'Scenic lakeside bistro overlooking historical Dighalipukhuri with European cafe fare',
    neighborhood: 'Uzan Bazar & Latasil',
    address: 'Tayabullah Road, Opposite Dighalipukhuri North Bank, Uzan Bazar, Guwahati, Assam 781001',
    landmark: 'Opposite Dighalipukhuri Boating Point',
    mapsQuery: '11th Avenue Cafe Bistro Dighalipukhuri Guwahati',
    coordinates: { lat: 26.1888, lng: 91.7512 },
    cuisineTypes: ['Continental', 'Italian & Pizza', 'Bakery & Artisanal Desserts'],
    vibes: ['Romantic Date', 'Family Friendly', 'Scenic Vistas'],
    priceRange: '₹₹',
    costForTwo: 700,
    hasWifi: true,
    wifiSpeedDesc: '60 Mbps guest Wi-Fi',
    hasOutdoorSeating: true,
    outdoorType: 'Balcony overlooking tranquil Dighalipukhuri lake and huge rain trees',
    isPetFriendly: true,
    timings: '11:00 AM – 10:30 PM',
    dailyHours: createWeeklyHours('11:00 AM', '10:30 PM'),
    phone: '+91 361 260 1111',
    instagram: '@11thavenue_cafe',
    coverImage: '/src/assets/images/hero_guwahati_river_cafe_1792856938034.jpg',
    galleryImages: [
      {
        id: 'ea-g1',
        url: '/src/assets/images/hero_guwahati_river_cafe_1792856938034.jpg',
        caption: 'Overlooking the tree-lined Dighalipukhuri lake',
        category: 'View',
        uploadedBy: '11th Avenue Staff',
        date: 'Sep 2026'
      }
    ],
    menuCategories: [
      {
        category: 'Pasta, Risotto & Grills',
        items: [
          {
            name: 'Creamy Pesto Fettuccine with Pine Nuts',
            price: 360,
            description: 'Handmade fettuccine pasta in fresh basil pesto with parmesan shavings.',
            isVeg: true,
            isSignature: true
          },
          {
            name: 'Grilled Herb Butter Fish Fillet',
            price: 430,
            description: 'Pan-seared river fish fillet in lemon caper butter sauce with sauteed greens.',
            isVeg: false,
            isSignature: true
          },
          {
            name: 'Classic Tiramisu Classico',
            price: 250,
            description: 'Espresso-soaked ladyfingers, velvety mascarpone cream, and dark cocoa powder.',
            isVeg: true
          }
        ]
      }
    ],
    menuImages: [],
    rating: 4.7,
    reviewsCount: 49,
    reviews: [
      {
        id: 'rev-ea-1',
        userName: 'Nabanita Bora',
        rating: 5,
        date: '2026-10-09',
        comment: 'Sitting on the first-floor balcony watching the ducks swim in Dighalipukhuri while having iced tea is such a relaxed vibe.',
        visitType: 'Coffee Date'
      }
    ],
    specialties: ['Lakeside Balcony View', 'Pesto Fettuccine', 'Classic Tiramisu', 'Signature Mocktails'],
    features: ['Lakefront Balcony Seating', 'Free Wi-Fi', 'Board Games', 'Artisan Bakery', 'Vegetarian Options']
  },
  {
    id: 'woodsmoke-sixmile',
    name: 'Woodsmoke Bistro & Garden Cafe',
    tagline: 'Lush bohemian garden haven in Six Mile with woodfired ovens, artisanal thin crust, and shaded lawns',
    neighborhood: 'Six Mile & Khanapara',
    address: 'Near VIP Road Junction, Chachal, Six Mile, Guwahati, Assam 781022',
    landmark: 'Close to Chachal Tennis Complex / VIP Road',
    mapsQuery: 'Woodsmoke Bistro Six Mile Guwahati',
    coordinates: { lat: 26.1295, lng: 91.8080 },
    cuisineTypes: ['Italian & Pizza', 'Continental', 'Specialty Coffee & Tea'],
    vibes: ['Family Friendly', 'Lively Social', 'Romantic Date'],
    priceRange: '₹₹',
    costForTwo: 800,
    hasWifi: true,
    wifiSpeedDesc: '50 Mbps high-speed garden mesh',
    hasOutdoorSeating: true,
    outdoorType: 'Lush Tree-Shaded Garden Lawn with picnic tables & hammocks',
    isPetFriendly: true,
    timings: '12:00 PM – 10:30 PM',
    dailyHours: createWeeklyHours('12:00 PM', '10:30 PM'),
    phone: '+91 98640 45231',
    instagram: '@woodsmokebistro_ghy',
    coverImage: '/src/assets/images/cafe_rooftop_sunset_brew_1792856939896.jpg',
    galleryImages: [
      {
        id: 'ws-g1',
        url: '/src/assets/images/cafe_rooftop_sunset_brew_1792856939896.jpg',
        caption: 'Garden lounge setup under fairy-lit tropical trees',
        category: 'Ambience',
        uploadedBy: 'Woodsmoke Team',
        date: 'Oct 2026'
      }
    ],
    menuCategories: [
      {
        category: 'Artisanal Woodfired Pizza & Garden Bites',
        items: [
          {
            name: 'Quattro Formaggi with Wild Assam Honey',
            price: 520,
            description: 'Gorgonzola, mozzarella, fontina, parmesan with a drizzle of forest honey.',
            isVeg: true,
            isSignature: true
          },
          {
            name: 'Smoked Pork & Caramelized Onion Pizza',
            price: 580,
            description: 'House-smoked local pork, sweet slow-cooked onions, and fresh rosemary.',
            isVeg: false,
            isSignature: true
          },
          {
            name: 'Cold Pressed Pomegranate Rose Soda',
            price: 190,
            description: 'Fresh pomegranate juice, Damascus rose water, sparkling soda, and mint.',
            isVeg: true
          }
        ]
      }
    ],
    menuImages: [],
    rating: 4.8,
    reviewsCount: 45,
    reviews: [
      {
        id: 'rev-ws-1',
        userName: 'Sanjib Medhi',
        rating: 5,
        date: '2026-10-17',
        comment: 'Guwahati’s best pet-friendly garden cafe. Brought my golden retriever here on Sunday afternoon. Amazing thin crust pizza!',
        visitType: 'Family Outing'
      }
    ],
    specialties: ['Garden Lawn Seating', 'Pet Friendly Grounds', 'Woodfired Thin Crust Pizza', 'Artisan Mocktails'],
    features: ['Expansive Garden Seating', 'Pet Friendly', 'Free Wi-Fi', 'Car Parking Available', 'Outdoor Heaters in Winter']
  },
  {
    id: 'brown-creams-beltola',
    name: 'Brown Creams Artisan Bakehouse',
    tagline: 'Artisanal French bakery, laminated croissants, and single-estate pour-overs in serene Beltola',
    neighborhood: 'Beltola & Jayanagar',
    address: 'Survey Road, Near Beltola Tiniali, Jayanagar, Guwahati, Assam 781028',
    landmark: 'Behind Survey Bus Stop / Next to Jayanagar Park',
    mapsQuery: 'Brown Creams Artisan Bakehouse Beltola Guwahati',
    coordinates: { lat: 26.1215, lng: 91.7915 },
    cuisineTypes: ['Bakery & Artisanal Desserts', 'Specialty Coffee & Tea', 'Continental'],
    vibes: ['Quiet Study', 'Family Friendly'],
    priceRange: '₹',
    costForTwo: 420,
    hasWifi: true,
    wifiSpeedDesc: '80 Mbps Wi-Fi with study tables',
    hasOutdoorSeating: true,
    outdoorType: 'Cozy sidewalk patio with bistro tables',
    isPetFriendly: true,
    timings: '08:00 AM – 09:30 PM',
    dailyHours: createWeeklyHours('08:00 AM', '09:30 PM'),
    phone: '+91 361 223 5590',
    instagram: '@browncreams_assam',
    coverImage: '/src/assets/images/cafe_artisan_pour_over_1792856939697.jpg',
    galleryImages: [
      {
        id: 'bc-g1',
        url: '/src/assets/images/cafe_artisan_pour_over_1792856939697.jpg',
        caption: 'Freshly baked morning sourdough loaves and barista pour-over counter',
        category: 'Food & Drink',
        uploadedBy: 'Chef Bhaswati',
        date: 'Oct 2026'
      }
    ],
    menuCategories: [
      {
        category: 'Viennoiserie & Fresh Sourdough',
        items: [
          {
            name: 'Double Butter French Croissant',
            price: 130,
            description: '100% French butter, 27 layers of flaky honey-comb lamination.',
            isVeg: true,
            isSignature: true
          },
          {
            name: 'Pain au Chocolat with Valrhona Dark',
            price: 160,
            description: 'Flaky pastry filled with two batons of intense 64% Valrhona dark chocolate.',
            isVeg: true,
            isSignature: true
          },
          {
            name: 'Smoked Ham & Brie Sourdough Toastie',
            price: 270,
            description: 'House fermented 36-hr sourdough, French brie cheese, and honey glazed smoked ham.',
            isVeg: false
          },
          {
            name: 'Cinnamon Spiced Latte with Organic Jaggery',
            price: 170,
            description: 'Freshly roasted Karbi espresso with steamed milk, Ceylon cinnamon, and organic cane jaggery.',
            isVeg: true
          }
        ]
      }
    ],
    menuImages: [],
    rating: 4.8,
    reviewsCount: 33,
    reviews: [
      {
        id: 'rev-bc-1',
        userName: 'Ananya Goswami',
        rating: 5,
        date: '2026-10-12',
        comment: 'Their croissants rival Parisian patisseries! Crispy, buttery perfection. Very serene morning spot before the work day begins.',
        visitType: 'Morning Coffee'
      }
    ],
    specialties: ['Artisan French Croissants', 'Fresh Sourdough Breads', 'Pain au Chocolat', 'Karbi Anglong Espresso'],
    features: ['Early 8 AM Opening', 'Fresh Bakery Counter', 'Takeaway Sourdough', 'High-Speed Wi-Fi', 'Outdoor Sidewalk Seating']
  }
];

export const GUWAHATI_NEIGHBORHOODS = [
  'All Neighborhoods',
  'Uzan Bazar & Latasil',
  'Panbazar & Riverfront',
  'GS Road & Christian Basti',
  'Zoo Road & Bhangagarh',
  'Six Mile & Khanapara',
  'Beltola & Jayanagar'
];

export const CUISINE_OPTIONS = [
  'All Cuisines',
  'Specialty Coffee & Tea',
  'Assamese & Regional Fusion',
  'Continental',
  'Bakery & Artisanal Desserts',
  'Italian & Pizza',
  'Fast Food & Snacks',
  'Pan-Asian'
];

export const VIBE_OPTIONS = [
  'All Vibes',
  'Quiet Study',
  'Lively Social',
  'Romantic Date',
  'Family Friendly',
  'Scenic Vistas',
  'Live Music & Arts'
];

export const GUWAHATI_CENTER = {
  lat: 26.1680,
  lng: 91.7720,
};

export const NEIGHBORHOOD_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'Uzan Bazar & Latasil': { lat: 26.1905, lng: 91.7538 },
  'Panbazar & Riverfront': { lat: 26.1912, lng: 91.7455 },
  'GS Road & Christian Basti': { lat: 26.1558, lng: 91.7765 },
  'Zoo Road & Bhangagarh': { lat: 26.1662, lng: 91.7820 },
  'Six Mile & Khanapara': { lat: 26.1295, lng: 91.8080 },
  'Beltola & Jayanagar': { lat: 26.1215, lng: 91.7915 },
};
