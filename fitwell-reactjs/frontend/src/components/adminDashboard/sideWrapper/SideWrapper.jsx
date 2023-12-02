import React from 'react'
import '../admin_dashboard.css'

const SideWrapper = () => {
  return (
    <div class="white" id="sidebar-wrapper">
        <div class="sidebar-heading">
                <a href="./" class="brand-logo">
                        <img src="./img/Logo/logo1.png" alt="logo" class="logo-img"/>
                </a>
        </div>
        <div class="list-group list-group-flush my-3">
                <a href="./admin_dashboard_home"
                        class="list-group-item list-group-item-action bg-transparent text-light active"><i
                                class="fas fa-table-columns bg-transparent"></i>  Dashboard</a>


                <a href="./admin_dashboard_trainers"
                        class="list-group-item list-group-item-action bg-transparent text-light  active"><i
                                class="fas fa-user-md me-2"></i>Trainers</a>

                <a href="./admin_dashboard_customers"
                        class="list-group-item list-group-item-action bg-transparent text-light  active"><i
                                class="fas fa-users me-2"></i>Customers</a>

                <a href="./admin_dashboard_payment"
                        class="list-group-item list-group-item-action bg-transparent text-light fw-bold"><i
                                class="fas fa-chart-line me-2"></i>Payments</a>

                <a href="./admin_Dashboard_order"
                        class="list-group-item list-group-item-action bg-transparent text-light fw-bold"><i
                                class="fas fa-shopping-cart me-2"></i>Orders</a>

                <a href="./admin_Dashboard_add_product"
                        class="list-group-item list-group-item-action bg-transparent text-light fw-bold"><i
                                class="fas fa-plus me-2"></i>Add New Product</a>


                <a href="./admin_dashboard_feedback"
                   class="list-group-item list-group-item-action bg-transparent  text-light fw-bold"><i
                                class="fas fa-comment-dots me-2"></i>Feedbacks</a>

                <a href="./" style="margin-top: 60px; border-top: 2px solid rgba(0, 0, 0, 0.247);" class="list-group-item list-group-item-action bg-transparent text-light active"><i
                                class="fas fa-home me-2"></i>Home</a>
                <a href="./products" class="list-group-item list-group-item-action bg-transparent text-light active"><i
                                class="fas fa-shopping-cart me-2 bg-transparent"></i>Products</a>
                                
                <a href="/" class="list-group-item list-group-item-action bg-transparent text-light  fw-bold"><i
                         class="fas fa-power-off me-2"></i> Logout</a>
                             
                
        </div>
</div>
  )
}

export default SideWrapper