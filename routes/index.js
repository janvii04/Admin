var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;





// <!-- <tr>
// <th>S. No.</th>
// <th>Title</th>
// <th>Description</th>
// <th>Action</th>
// </tr>
// </thead>
// <tbody>
// <tr>
// <td>1</td>
// <td>Dance</td>
// <td>You have to dance for one whole minute</td>
// <td>
//   <button class="edit-btn">✏️</button>
//   <button class="delete-btn">🗑️</button>
// </td>
// </tr> -->