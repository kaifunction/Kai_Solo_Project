from app.models import Pin, db, environment, SCHEMA
from sqlalchemy.sql import text


def pin_seed_data(all_users):
     pin1 = Pin(title='Typeface Evolution', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/poster1.jpeg', description='A visual journey through the evolution of typefaces, exploring the historical and cultural influences that shaped the diverse world of fonts.', user_id=1)
     pin2 = Pin(title='Typography Unleashed', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/poster2.jpeg', description='Uncover the power of typography as a design element, from bold and expressive fonts to minimalist and sleek typefaces that make a lasting impact.', user_id=1)
     pin3 = Pin(title='Scripted Elegance', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/poster3.jpeg', description='Dive into the world of scripted fonts, where elegance and sophistication meet in a collection of beautifully crafted letterforms.', user_id=1)
     pin4 = Pin(title='Less Words', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/poster4.jpeg', description='Explore the debate between serifs and sans-serifs, understanding their unique characteristics and the impact they have on visual communication.', user_id=1)
     pin5 = Pin(title='Vintage Lettering Revival', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/poster5.jpeg', description='Take a step back in time with a showcase of vintage lettering styles, capturing the nostalgic charm of classic fonts that continue to inspire.', user_id=1)
     pin6 = Pin(title='Modern Minimalism', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/poster6.jpeg', description='Delight in the simplicity and clarity of modern minimalist fonts, discovering how clean lines and simplicity enhance visual communication.', user_id=1)
     pin7 = Pin(title='Handcrafted Typography', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/poster7.jpeg', description='Celebrate the artistry of handcrafted typography, where each letter is a unique creation, reflecting the skill and personality of the designer.', user_id=1)
     pin8 = Pin(title='Experimental Font Play', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/poster8.jpeg', description='Push the boundaries of conventional fonts with experimental and avant-garde letterforms, challenging the norms of typographic design.', user_id=1)
     pin9 = Pin(title='Cultural Typography Fusion', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/poster9.jpeg', description='Merge typography with cultural elements, showcasing how fonts can be a powerful expression of identity and diversity.', user_id=1)
     pin10 = Pin(title='Digital Font Revolution', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/poster10.jpeg', description='Explore the digital font revolution, where technology and design converge to create innovative and dynamic fonts for the digital age.', user_id=1)

     pin11 = Pin(title='Dreamscape', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Illustration1.jpeg', description='An ethereal illustration capturing the essence of dreams and imagination, where reality and fantasy blend seamlessly.', user_id=2)
     pin12 = Pin(title='Techno Utopia', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Illustration2.jpeg', description='Dive into a futuristic cityscape filled with sleek skyscrapers, flying vehicles, and advanced technologies, depicting a utopian vision of urban life.', user_id=2)
     pin13 = Pin(title='Enchanted Forest', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Illustration3.jpeg', description='Transport yourself to a magical forest where mythical creatures and glowing flora create a whimsical and enchanting atmosphere.', user_id=2)
     pin14 = Pin(title='Underwater Odyssey', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Illustration4.jpeg', description='Explore the depths of the ocean with a mesmerizing underwater scene, featuring vibrant marine life and hidden treasures.', user_id=2)
     pin15 = Pin(title='Steampunk Wonderland', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Illustration5.jpeg', description='Enter a world where Victorian aesthetics meet steam-powered machinery, showcasing the charm and intrigue of the steampunk genre.', user_id=2)
     pin16 = Pin(title='Celestial Symphony', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Illustration6.jpeg', description='An illustration inspired by the cosmos, depicting celestial bodies and cosmic energies in a harmonious dance across the night sky.', user_id=2)
     pin17 = Pin(title='Pixel Perfection', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Illustration7.jpeg', description='Embrace the nostalgic charm of pixel art in a vibrant and detailed illustration that pays homage to classic video game aesthetics.', user_id=2)
     pin18 = Pin(title='Cultural Mosaic', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Illustration8.jpeg', description='Illustrating diversity and unity, this artwork showcases people from various cultures coming together, celebrating the richness of global heritage.', user_id=2)
     pin19 = Pin(title='Robotic Serenity', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Illustration9.jpeg', description='An illustration blending the futuristic and serene, featuring robots engaged in peaceful activities against a backdrop of advanced technology.', user_id=2)
     pin20 = Pin(title='Timeless Elegance', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Illustration10.jpeg', description='A sophisticated illustration capturing timeless elegance through graceful figures, intricate details, and a touch of classic beauty.', user_id=2)
     pin21 = Pin(title='Capturing Moments in Time', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Photography1.jpeg', description='Explore the art of freezing moments with a lens, revealing the beauty of fleeting instances and the stories they tell.', user_id=3)
     pin22 = Pin(title='Nature Canvas: Through the Photographer Lens', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Photography2.jpeg', description='Immerse yourself in the breathtaking world of nature photography, showcasing the raw and unfiltered beauty of landscapes, flora, and fauna.', user_id=3)
     pin23 = Pin(title='Portraits of Emotion', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Photography3.jpeg', description='Delve into the emotional depth of portraiture, where every shot tells a unique story through the eyes, expressions, and personalities of the subjects.', user_id=3)
     pin24 = Pin(title='Urban Perspectives: Cityscapes Unveiled', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Photography4.jpeg', description='Witness the city through the eyes of a photographer, capturing the essence of urban life, architecture, and the juxtaposition of chaos and order.', user_id=3)
     pin25 = Pin(title='Monochrome Masterpieces', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Photography5.jpeg', description='Experience the timeless elegance of black and white photography, where shadows and highlights create powerful compositions that stand the test of time.', user_id=3)
     pin26 = Pin(title='Abstract Visions: Beyond Reality', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Photography6.jpeg', description='Step into the world of abstract photography, where unconventional angles, textures, and compositions challenge perceptions and spark imagination.', user_id=3)
     pin27 = Pin(title='The Play of Light and Shadow', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Photography7.jpeg', description='Discover the magic of light and shadow in photography, exploring how these elements can transform ordinary scenes into extraordinary visual narratives.', user_id=3)
     pin28 = Pin(title='Cinematic Storytelling', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Photography8.jpeg', description='Uncover the cinematic approach to photography, where each frame tells a narrative, evoking emotions and transporting viewers into a visual story.', user_id=3)
     pin29 = Pin(title='Exploring Cultural Perspectives', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Photography9.jpeg', description='Embark on a cultural journey through the lens, documenting traditions, rituals, and everyday life that reflect the rich tapestry of global diversity.', user_id=3)
     pin30 = Pin(title='Photography in Motion', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/Photography10.jpeg', description='Witness the dynamic energy of photography in motion, capturing movement, vitality, and the ever-changing moments that define the essence of life.', user_id=3)
     pin31 = Pin(title='Visual Identity Crafting', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/GD1.jpeg', description='Dive into the world of graphic design, where the art of crafting visual identities helps businesses and brands communicate their essence to the world.', user_id=4)
     pin32 = Pin(title='Where Letters Come to Life', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/GD2.jpeg', description='Explore the fusion of typography and design, witnessing how fonts and letterforms become dynamic visual elements in the hands of graphic designers.', user_id=4)
     pin33 = Pin(title='Color Palette Exploration', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/GD3.jpeg', description='Immerse yourself in the vibrant world of color, as graphic designers experiment with palettes to evoke emotions, convey messages, and create visually stunning compositions.', user_id=4)
     pin34 = Pin(title='Interactive Design: Engaging Audiences', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/GD4.jpeg', description='Step into the realm of interactive graphic design, where designers create engaging user experiences, from websites and apps to interactive installations that captivate audiences.', user_id=4)
     pin35 = Pin(title='Illustrative Storytelling', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/GD5.jpeg', description='Experience the power of illustration in graphic design, where artists tell compelling stories through visually captivating and narrative-driven artwork.', user_id=4)
     pin36 = Pin(title='Minimalist Marvels', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/GD6.jpeg', description='Appreciate the simplicity and elegance of minimalist graphic design, where less becomes more, and every element serves a purpose in creating a harmonious composition.', user_id=4)
     pin37 = Pin(title='Beyond Boundaries', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/GD7.jpeg', description='Witness the cutting-edge realm of digital graphic design, exploring innovative techniques, digital artistry, and the limitless possibilities of the virtual canvas.', user_id=4)
     pin38 = Pin(title='Branding Beyond Logos', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/GD8.jpeg', description='Understand the comprehensive world of branding, where graphic designers create cohesive brand experiences that extend far beyond logos, incorporating visual elements into every touchpoint.', user_id=4)
     pin39 = Pin(title='Environmental Graphic Design', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/GD9.jpeg', description='Explore the integration of design into physical spaces, as graphic designers shape environments, enhancing user experiences through signage, wayfinding, and immersive installations.', user_id=4)
     pin40 = Pin(title='Social Impact through Design', pin_link='https://vibevision-project.s3.us-west-1.amazonaws.com/GD10.jpeg', description='Discover how graphic design becomes a tool for social change, addressing critical issues, advocating for justice, and conveying powerful messages that resonate with global audiences.', user_id=4)

     all_pins = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10, pin11, pin12, pin13, pin14, pin15, pin16, pin17, pin18, pin19, pin20, pin21, pin22, pin23, pin24, pin25, pin26, pin27, pin28, pin29, pin30, pin31, pin32, pin33, pin34, pin35, pin36, pin37, pin38, pin39, pin40]

     # for pin in all_pins:
     #      pin.user = all_users[pin.user_id]

     db.session.add_all(all_pins)
     db.session.commit()
     return all_pins

def undo_pin_seeds():
     if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
     else:
        db.session.execute(text("DELETE FROM pins"))
     db.session.commit()
