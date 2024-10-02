"use strict";

import { get_items, add_item, update_item_title_by_id, delete_item_by_id, get_item_title_by_id } from './data.js';

add_item({ id: 1, title: "First Item" });
console.log(get_items()); 
console.log(update_item_title_by_id(1, "Updated Item")); 
console.log(get_item_title_by_id(1)); 
console.log(delete_item_by_id(1)); 
console.log(get_items()); 