# Subscription Tracker API

A modern REST API for tracking and managing subscriptions with automated renewal reminders.

## Features

- 🔒 User authentication and authorization
- 📊 Subscription management with CRUD operations
- 📅 Automatic renewal reminders at configurable intervals
- 📧 Email notifications for upcoming subscription renewals
- 🔄 Workflow-based reminder system using Upstash

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Workflow Engine**: Upstash Workflow
- **Email**: Nodemailer
- **Security**: Arcjet for rate limiting and protection

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB instance (local or Atlas)
- Upstash account for workflow management
- SMTP server access for email sending

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Mustafaguzel2/Subscription-Tracker.git
   cd subscription-tracker
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create environment files

   ```bash
   touch .env.development.local
   ```

4. Set up environment variables in `.env.development.local`:

   ```
   PORT=5555
   NODE_ENV=development
   DB_URI=your mongodb uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1d
   SERVER_URL=http://localhost:5555

   # Upstash credentials
   QSTASH_URL=https://qstash.upstash.io/v2
   QSTASH_TOKEN=your_qstash_token
   QSTASH_CURRENT_SIGNING_KEY=your_current_signing_key
   QSTASH_NEXT_SIGNING_KEY=your_next_signing_key

   # Email configuration
   EMAIL_PASSWORD=your_email_password

   # Arcjet (optional)
   ARCJET_KEY=your_arcjet_key
   ARCJET_ENV=development
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get JWT token

### Users

- `GET /api/v1/users/:id` - Get current user profile
- `PUT /api/v1/users/:id` - Update user profile

### Subscriptions

- `GET /api/v1/subscriptions` - Get all subscriptions for current user
- `GET /api/v1/subscriptions/:id` - Get a specific subscription
- `POST /api/v1/subscriptions` - Create a new subscription
- `PUT /api/v1/subscriptions/:id` - Update a subscription
- `DELETE /api/v1/subscriptions/:id` - Delete a subscription
- `GET /api/v1/subscriptions/upcoming-renewals` - Get upcoming subscription renewals

### Workflow

- `POST /api/v1/workflow/subscription/remainder` - Endpoint for Upstash Workflow to trigger reminders

## Subscription Reminders

The application automatically sends reminder emails at the following intervals before a subscription renewal:

- 7 days before renewal
- 5 days before renewal
- 2 days before renewal
- 1 day before renewal

## Project Structure

subscription-tracker/
├── app.js # Application entry point
├── config/ # Configuration files
│ ├── env.js # Environment variables
│ ├── nodemailer.js # Email configuration
│ └── upstash.js # Upstash workflow configuration
├── controller/ # Route controllers
│ ├── auth.controller.js # Authentication logic
│ ├── subscription.controller.js # Subscription management
│ ├── user.controller.js # User management
│ └── workflow.controller.js # Reminder workflow
├── database/ # Database setup
│ └── mongodb.js # MongoDB connection
├── middlewares/ # Express middlewares
│ ├── arcjet.middleware.js # Rate limiting
│ ├── auth.middleware.js # Authentication middleware
│ └── error.middleware.js # Error handling
├── models/ # Mongoose models
│ ├── subscription.model.js # Subscription schema
│ └── user.model.js # User schema
├── routes/ # API routes
│ ├── auth.routes.js # Authentication routes
│ ├── subscription.route.js # Subscription routes
│ ├── user.routes.js # User routes
│ └── workflow.routes.js # Workflow webhook routes
└── utils/ # Utility functions
├── email-template.js # Email templates
└── send-email.js # Email sending function

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Upstash](https://upstash.com/) for providing the workflow engine
- [Express](https://expressjs.com/) for the web framework
- [Mongoose](https://mongoosejs.com/) for MongoDB object modeling

---

Built with ❤️ by [Mustafa Guzel]
