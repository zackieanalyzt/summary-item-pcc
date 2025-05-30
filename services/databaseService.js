// services/databaseService.js
const { mariadbPool } = require('../config/db');

const getPreviewData = async (startDate, endDate, limit = 100) => {
  const query = `
    SELECT 
        main.HN,
        LEFT(main.vn_an, 12) AS vn,
        CASE 
            WHEN main.an IS NOT NULL THEN 'ผู้ป่วยใน'
            ELSE 'ผู้ป่วยนอก'
        END AS visit_type,
        main.quantity,
        main.Price,
        main.item_common_name,
        main.item_group,
        main.department,
        main.year,
        main.month,
        main.date
    FROM (
        SELECT 
            o.hn AS HN,
            COALESCE(o.vn, o.an) AS vn_an,
            o.an,
            CAST(COALESCE(o.qty, 0) AS DECIMAL(11,1)) AS quantity,
            CAST(COALESCE(o.sum_price, 0) AS DECIMAL(11,2)) AS Price,
            i.name AS item_group,
            dd.name AS item_common_name,
            kskdepartment.department,
            CAST(YEAR(o.rxdate) + 543 AS CHAR) AS year,
            LPAD(MONTH(o.rxdate), 2, '0') AS month,
            LPAD(DAY(o.rxdate), 2, '0') AS date
        FROM opitemrece o
        LEFT JOIN income i ON i.income = o.income
        INNER JOIN ovst ov ON ov.vn = o.vn OR ov.an = o.an
        INNER JOIN kskdepartment ON ov.last_dep = kskdepartment.depcode
        LEFT JOIN (
            SELECT icode, name, income FROM nondrugitems
            UNION ALL
            SELECT icode, CONCAT(name, ' ', COALESCE(strength, '')), income FROM drugitems
        ) dd ON dd.icode = o.icode
        WHERE kskdepartment.depcode IN ('108','109','110')
        AND o.rxdate BETWEEN ? AND ?
    ) AS main
    ORDER BY main.date ASC, main.HN ASC
  `;

  const [rows] = await mariadbPool.query(query, [startDate, endDate, parseInt(limit)]);
  return rows;
};

module.exports = {
  getPreviewData
};