import  db  from '../config/db.js';

export const getReportData = async (loungeId) => {
  const [totalSalesRow] = await db.query(
    `SELECT SUM(total_price) AS totalSales, COUNT(*) AS totalOrders 
     FROM orders WHERE lounge_id = ? AND status = 'completed'`, [loungeId]
  );
  const totalSales = totalSalesRow[0].totalSales || 0;
  const totalOrders = totalSalesRow[0].totalOrders || 0;

  const [avgOrderValueRow] = await db.query(
    `SELECT AVG(total_price) AS averageOrderValue 
     FROM orders WHERE lounge_id = ? AND status = 'completed'`, [loungeId]
  );
  const averageOrderValue = avgOrderValueRow[0].averageOrderValue || 0;

  const [dailySales] = await db.query(
    `SELECT DATE(added_at) AS date, SUM(total_price) AS amount 
     FROM orders WHERE lounge_id = ? AND status = 'completed' 
     GROUP BY DATE(added_at) ORDER BY date DESC LIMIT 7`, [loungeId]
  );

  const [monthlySales] = await db.query(
    `SELECT DATE_FORMAT(added_at, '%Y-%m') AS date, SUM(total_price) AS amount 
     FROM orders WHERE lounge_id = ? AND status = 'completed'
     GROUP BY DATE_FORMAT(added_at, '%Y-%m') ORDER BY date DESC LIMIT 6`, [loungeId]
  );

  const [categorySales] = await db.query(
    `SELECT mi.name AS category, SUM(oi.quantity * oi.price) AS amount
     FROM order_items oi
     JOIN menu_items mi ON oi.menu_item_id = mi.menu_item_id
     JOIN orders o ON oi.order_id = o.order_id
     WHERE o.lounge_id = ? AND o.status = 'completed'
     GROUP BY mi.name ORDER BY amount DESC LIMIT 6`, [loungeId]
  );

  const [topItems] = await db.query(
    `SELECT mi.name, SUM(oi.quantity) AS quantity, SUM(oi.quantity * oi.price) AS revenue
     FROM order_items oi
     JOIN menu_items mi ON oi.menu_item_id = mi.menu_item_id
     JOIN orders o ON oi.order_id = o.order_id
     WHERE o.lounge_id = ? AND o.status = 'completed'
     GROUP BY mi.name ORDER BY revenue DESC LIMIT 5`, [loungeId]
  );

  const [satisfactionRow] = await db.query(
    `SELECT AVG(rating) AS customerSatisfaction 
     FROM feedback WHERE lounge_id = ?`, [loungeId]
  );
  const customerSatisfaction = satisfactionRow[0]?.customerSatisfaction || 0;

  return {
    totalSales,
    totalOrders,
    averageOrderValue,
    customerSatisfaction,
    dailySales: dailySales.reverse(),
    monthlySales: monthlySales.reverse(),
    categorySales,
    topSellingItems: topItems,
  };
};

export const getAggregatedReportData = async (loungeId = null) => {
  const conditions = [];
  if (loungeId) conditions.push(`o.lounge_id = ${db.escape(loungeId)}`);
  conditions.push(`o.status = 'completed'`);
  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [totalSalesRow] = await db.query(
    `SELECT SUM(o.total_price) AS totalSales, COUNT(*) AS totalOrders
     FROM orders o
     ${whereClause}`
  );
  const totalSales = totalSalesRow[0].totalSales || 0;
  const totalOrders = totalSalesRow[0].totalOrders || 0;

  const [avgOrderValueRow] = await db.query(
    `SELECT AVG(o.total_price) AS averageOrderValue
     FROM orders o
     ${whereClause}`
  );
  const averageOrderValue = avgOrderValueRow[0].averageOrderValue || 0;

  const [dailySales] = await db.query(
    `SELECT DATE(o.added_at) AS date, SUM(o.total_price) AS amount
     FROM orders o
     ${whereClause}
     GROUP BY DATE(o.added_at) ORDER BY date DESC LIMIT 7`
  );

  const [monthlySales] = await db.query(
    `SELECT DATE_FORMAT(o.added_at, '%Y-%m') AS date, SUM(o.total_price) AS amount
     FROM orders o
     ${whereClause}
     GROUP BY DATE_FORMAT(o.added_at, '%Y-%m') ORDER BY date DESC LIMIT 6`
  );

  const [categorySales] = await db.query(
    `SELECT mi.name AS category, SUM(oi.quantity * oi.price) AS amount
     FROM order_items oi
     JOIN menu_items mi ON oi.menu_item_id = mi.menu_item_id
     JOIN orders o ON oi.order_id = o.order_id
     ${whereClause}
     GROUP BY mi.name ORDER BY amount DESC LIMIT 6`
  );

  const [topItems] = await db.query(
    `SELECT mi.name, SUM(oi.quantity) AS quantity, SUM(oi.quantity * oi.price) AS revenue
     FROM order_items oi
     JOIN menu_items mi ON oi.menu_item_id = mi.menu_item_id
     JOIN orders o ON oi.order_id = o.order_id
     ${whereClause}
     GROUP BY mi.name ORDER BY revenue DESC LIMIT 5`
  );

  const [satisfactionRow] = await db.query(
    `SELECT AVG(f.rating) AS customerSatisfaction
     FROM feedback f
     ${loungeId ? `WHERE f.lounge_id = ${db.escape(loungeId)}` : ''}`
  );
  const customerSatisfaction = satisfactionRow[0]?.customerSatisfaction || 0;

  const [revenueByLounge] = loungeId ? [[]] : await db.query(
    `SELECT l.name AS loungeName, SUM(o.total_price) AS revenue
     FROM orders o
     JOIN lounges l ON o.lounge_id = l.lounge_id
     WHERE o.status = 'completed'
     GROUP BY l.lounge_id ORDER BY revenue DESC`
  );

  const [demandByHour] = await db.query(
    `SELECT HOUR(o.added_at) AS hour, COUNT(*) AS orderCount
     FROM orders o
     ${whereClause}
     GROUP BY hour ORDER BY hour ASC`
  );

  return {
    totalSales,
    totalOrders,
    averageOrderValue,
    customerSatisfaction,
    dailySales: dailySales.reverse(),
    monthlySales: monthlySales.reverse(),
    categorySales,
    topSellingItems: topItems,
    revenueByLounge,
    demandByHour
  };
};
