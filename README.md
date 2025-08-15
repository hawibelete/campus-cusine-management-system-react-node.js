# Campus Cuisine Management System

A full-stack web application for ordering food from Hawassa University's lounges.
Students, lounge staff, and administrators can access role-specific features to make food ordering and lounge management simple and efficient.

## Features

- Menu Browsing: View lounge menus in real time.

- Ordering: Place pickup or delivery orders.

- Payments: Pay online or through prepaid subscription.

- Order Tracking: See live updates on order status.

- Feedback: Rate dishes, leave feedback, and mark favorites.

- Lounge Management: Lounge staff can update menus, handle orders, and view customer feedback.

- Administration: the admin can manage lounges, control users, and view performance reports.

## Tech Stack

- Frontend: React + Redux, Bootstrap

- Backend: Node.js + Express

- Database: MySQL (role-based access control)

- Authentication: JWT with HTTP-only cookies

## Requirements

- Node.js: Version 18 or higher

- MySQL: Version 8 or higher

## How to Run

Clone the repository:
```bash
git clone https://github.com/your-username/campus-cuisine-management-system.git
```

Install dependencies:

cd client && npm install
cd ../server && npm install


Start the backend:

cd ../server
npm start


Start the frontend:

cd ../client
npm run dev

## Notes

Works best on modern browsers.

Different dashboards for admin, lounge staff, and student roles.

Optional delivery feature can be enabled or disabled per lounge.

## License

This project is for educational purposes.
