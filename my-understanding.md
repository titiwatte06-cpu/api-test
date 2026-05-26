My Understanding
Submission Links
Loom Video (must be set to public — anyone with the link): [paste your Loom video URL here]

Questions
Answer each question in your own words. There are no trick questions.

The goal is not a perfect answer — it is an honest one. Write as if you are explaining to a friend who has never used Express. Completing this will prepare you for your video walkthrough.

Do not copy from documentation, your code comments, or AI output. If you are unsure about something, write what you do understand and note where the gap is.

1. What does each HTTP method in your API mean — GET, POST, PUT or PATCH, and DELETE? Why do we use different methods instead of just using POST for everything?

Your answer: HTTP methods คือวิธีที่ใช้บอกว่า request นี้ต้องการทำอะไรกับข้อมูล โดย GET ใช้ดึงข้อมูล, POST ใช้สร้างข้อมูลใหม่, PUT/PATCH ใช้อัปเดตข้อมูล และ DELETE ใช้ลบข้อมูล เราใช้ method ที่ต่างกันเพื่อให้ API เป็นมาตรฐาน อ่านง่าย และ backend สามารถแยกหน้าที่ของแต่ละ request ได้ชัดเจน ถ้าใช้ POST ทุกอย่างจะทำให้ code อ่านยากและจัดการ route ได้ลำบาก

2. What is express.json() and what would happen if you left it out?

Your answer: ถ้าเอา express.json() ออกไปสิ่งที่จะเกิดขึ้นคือ ไฟล์จะไม่สามารถเอาข้อมูลที่ส่งจาก frontend ไปใช้งานในส่วนอื่นๆได้ ซึ่งมันจะทำให้ข้อมูลส่งไม่ถึง backend นอกจากนี้ express.json() เป็น middleware ที่ใช้แปลง JSON จาก request body ให้ backend อ่านได้ผ่าน req.body ถ้าไม่ใส่ express.json() ค่า req.body จะเป็น undefined ทำให้ backend ไม่สามารถอ่านข้อมูลที่ส่งมาจาก frontend ได้

3. What is the difference between req.body, req.params, and req.query? Give a real example from your API for each one.

Your answer: req.body ก็คือการที่หมายถึงเราเอาข้อมูลทุกอย่างที่เราได้มาจาก request ของ frontend มาใช้งาน ส่วน req.params คือข้อมูลของ ตัวลิงค์ที่สิ่งมาพร้อมกับ path ใน frontend และนอกจากนี้ในส่วนของ req.query ก็คือ ลิงค์ที่มาจากการค้นหาในหน้าเว็บซึ่งใน api ของผมก็มีตัวอย่างนี้ คือ ใน ส่วนอันแรก เราจะเจอได้ใน method GET ซึ่งเป็น method ที่จะดึงข้อมูลทั้งหมดมาจาก database ออกมา ส่วน req.params และ req.query คือ method ที่เราจะดึงมันออกมาเพื่อใช้ในการระบุเจาะจงไปที่ ตัวข้อมูลใดข้อมูลหนึ่ง สำหรับการ filter

req.body คือข้อมูลที่ส่งมากับ request body เช่นข้อมูล form ตอนสร้าง product ใหม่
ตัวอย่าง:
POST /products
body: { "name": "iPhone", "price": 30000 }

req.params คือค่าที่อยู่ใน URL path ใช้ระบุข้อมูลเฉพาะตัว
ตัวอย่าง:
GET /products/5
โดยเลข 5 จะอยู่ใน req.params.id

req.query คือค่าที่ต่อท้าย URL สำหรับ filter หรือ search
ตัวอย่าง:
GET /products?category=phone
โดย category จะอยู่ใน req.query.category

4. What are HTTP status codes? List every status code you used in your API and explain why you chose it for that situation.

Your answer: HTTP status code คือรหัสที่ backend ส่งกลับไปให้ client เพื่อบอกผลลัพธ์ของ request เช่น:

200 OK ใช้เมื่อดึงข้อมูลสำเร็จ
201 Created ใช้เมื่อสร้างข้อมูลสำเร็จ
400 Bad Request ใช้เมื่อ client ส่งข้อมูลไม่ครบ
404 Not Found ใช้เมื่อไม่พบข้อมูล
500 Internal Server Error ใช้เมื่อเกิด error ใน server

5. What is middleware? Describe what it does in your own words and give one example from your code.

Your answer: middleware เป็นตัวที่เอาไว้เหมือนกับตัวกรองเวลาที่มีข้อมูลส่งมาจาก frontend Middleware คือ function ที่ทำงานก่อน request จะไปถึง route หลัก ใช้สำหรับตรวจสอบ แปลงข้อมูล หรือจัดการ request เช่น express.json() ใช้แปลง JSON และ middleware บางตัวใช้ตรวจสอบ token หรือ log request

6. Why does the order of middleware matter in Express? What could go wrong if it were in the wrong order?

Your answer: การเรียงลำดับใน middleware สำคัญมากๆเพราะว่าถ้าเรียงลำดับผิดไปจะทำให้ลำดับในการทำงานของโค้ดเราผิดพลาดและทำให้การกรองข้อมูลทำได้ไม่ค่อยดี เช่น ถ้าวาง express.json() หลัง route ค่า req.body จะเป็น undefined

7. Walk through what happens on the server, step by step, when a POST request is sent to /products.

Your answer: เมื่อ [POST] ส่ง request ไปให้ ในโค้ดฝั่ง backend ก็จะต้องผ่าน middleware ก่อนและค่อยเข้าไปตามเงื่อนไขที่ code ฝั่ง backend วางไว้ เมื่อมันมาเข้าที่ path mี่เรากำหนดไว้มันก็จะทำการรับเอา ค่าที่ได้มาจาก frontend เข้ามาและแตกข้อมูลเข้ามาในเงื่อนไขที่เราวางไว้เมื่อมันเสร็จสิ้นแล้ว ถ้ามันสำเร็จ มันก็จะส่งค่ากลับไปทาง frontend แต่ถ้าไม่มันก็จะแจ้งเราผ่านทาง console ที่สามารถเปิดดูได้ใน frontend ครับ

8. What is CRUD? Map each operation to the HTTP method and route you used in your API.

Your answer: CRUD คือการจัดการข้อมูล 4 แบบ ได้แก่ Create, Read, Update และ Delete ซึ่งแต่ละส่วนจะใช้ HTTP method ต่างกัน เช่น
ในการเพิ่มข้อมูลใหม่ ก็จะ path ของ /post และในการ ดึงข้อมูลก็จะใช้ path ของ /get นอกจากนี้ ใน path ที่เป็นการลบข้อมูลก็จะใช้ path /delete เข้ามาใช้ด้วยครับ

9. How does your API respond when something goes wrong — for example, when a product with a given ID does not exist?

Your answer: ถ้าไม่พบ product ตาม ID ที่ส่งมา API จะตอบกลับด้วย status code 404 และส่ง message เช่น “Product not found” เพื่อแจ้งให้ frontend รู้ว่าไม่มีข้อมูลนี้อยู่ใน database

10. What was the hardest part of building this API and what did you do to get past it?

Your answer: สิ่งที่ยากที่สุดคือเรื่องของ syntax และ การวาง logic ของ API ครับ ถ้าเป็นในส่วนของ ภาพรวมทั้งหมดผมถึงว่าตัวเองค่อนข้างเข้าใจมากๆครับ โดยเฉพาะในเรื่องของการติดต่อ api และ ในเรื่องของการติดตั้ง mongoose เพื่อเชื่อมต่อกับ MongoDB ครับ แต่ว่าสิ่งหนึ่งที่เป็นอุปวสรรคของผมมากๆคือเรื่องของการเขียน logic ให้มันเข้าเงื่อนไขที่ผมได้วางไว้ครับแต่ผมแก้ปัญหาโดยลอง debug ทีละส่วน อ่าน error จาก console และค่อยๆทดสอบ request ผ่าน Postman จนเข้าใจ flow การทำงานของ API มากขึ้น
