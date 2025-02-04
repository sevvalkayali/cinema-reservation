const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Business Logic Tests', () => {
    beforeAll(async () => {
        // Test veritabanına bağlanma
        await mongoose.connect('mongodb://localhost:27017/cinema-reservation-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('Register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', password: 'testpass', role: 'user' });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    // Ek testler (login, rezervasyon oluşturma vb.) eklenebilir.
});
