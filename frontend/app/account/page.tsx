import signOut from "@/actions/user/sign-out";
import TabsPanel from "./components/tabs/tabs";

function OrderHistory() {
  return <>
    <div className="order-history-table">
      <div className="order-table-header">
        <div className="order-table-cell">Order Details</div>
        <div className="order-table-cell">Order Status</div>
        <div className="order-table-cell">Total</div>
      </div>
      <div className="order-table-body">
        <div className="order-table-row">
          <div className="order-table-cell">
            <span className="order-id">#123232122033</span>
            <span className="order-date">7 Mar 2025</span>
          </div>
          <div className="order-table-cell">
            <span className="order-status">Pending</span>
          </div>
          <div className="order-table-cell">
            <span className="order-total">$100.00</span>
          </div>
        </div>
        <div className="order-table-row">
          <div className="order-table-cell">
            <span className="order-id">#123232122033</span>
            <span className="order-date">7 Mar 2025</span>
          </div>
          <div className="order-table-cell">
            <span className="order-status">Pending</span>
          </div>
          <div className="order-table-cell">
            <span className="order-total">$90.00</span>
          </div>
        </div>
        <div className="order-table-row">
          <div className="order-table-cell">
            <span className="order-id">#123232122033</span>
            <span className="order-date">7 Mar 2025</span>
          </div>
          <div className="order-table-cell">
            <span className="order-status">Confirmed</span>
          </div>
          <div className="order-table-cell">
            <span className="order-total">$140.00</span>
          </div>
        </div>
        <div className="order-table-row">
          <div className="order-table-cell">
            <span className="order-id">#123232122033</span>
            <span className="order-date">7 Mar 2025</span>
          </div>
          <div className="order-table-cell">
            <span className="order-status">Delivered</span>
          </div>
          <div className="order-table-cell">
            <span className="order-total">$120.00</span>
          </div>
        </div>
        <div className="order-table-row">
          <div className="order-table-cell">
            <span className="order-id">#123232122033</span>
            <span className="order-date">7 Mar 2025</span>
          </div>
          <div className="order-table-cell">
            <span className="order-status">Shipped</span>
          </div>
          <div className="order-table-cell">
            <span className="order-total">$120.00</span>
          </div>
        </div>
        <div className="order-table-row">
          <div className="order-table-cell">
            <span className="order-id">#123232122033</span>
            <span className="order-date">7 Mar 2025</span>
          </div>
          <div className="order-table-cell">
            <span className="order-status">Shipped</span>
          </div>
          <div className="order-table-cell">
            <span className="order-total">$120.00</span>
          </div>
        </div>
        <div className="order-table-row">
          <div className="order-table-cell">
            <span className="order-id">#123232122033</span>
            <span className="order-date">7 Mar 2025</span>
          </div>
          <div className="order-table-cell">
            <span className="order-status">Shipped</span>
          </div>
          <div className="order-table-cell">
            <span className="order-total">$120.00</span>
          </div>
        </div>
        <div className="order-table-row">
          <div className="order-table-cell">
            <span className="order-id">#123232122033</span>
            <span className="order-date">7 Mar 2025</span>
          </div>
          <div className="order-table-cell">
            <span className="order-status">Shipped</span>
          </div>
          <div className="order-table-cell">
            <span className="order-total">$120.00</span>
          </div>
        </div>
      </div>
    </div>
    <div className="account-pagination">
      <a href="#" className="pagination-link-account disabled">← Previous</a>
      <a href="#" className="pagination-link-account">Next →</a>
    </div>
  </>;
}

function AccountForm() {
  return <>
    <div className="account-form-container">
      <h2 className="account-form-title">Personal Info</h2>
      <form id="account-info-form">
        <div className="checkout-form-group">
          <label htmlFor="acc-full-name">Full Name</label>
          <input type="text" id="acc-full-name" name="full_name" className="Input" placeholder="Value" required />
        </div>
        <div className="checkout-form-group">
          <label htmlFor="acc-phone">Phone number</label>
          <input type="tel" id="acc-phone" name="phone" className="Input" placeholder="Value" required />
        </div>
        <div className="checkout-form-group">
          <label htmlFor="acc-email">Email</label>
          <input type="email" id="acc-email" name="email" className="Input" placeholder="example@mail.com" required />
        </div>
        <div className="checkout-form-group">
          <label htmlFor="acc-city">City</label>
          <input type="text" id="acc-city" name="city" className="Input" placeholder="Value" required />
        </div>
        <div className="checkout-form-group">
          <label htmlFor="acc-address">Shipping address</label>
          <textarea id="acc-address" name="address" className="Textarea" placeholder="Value" rows={3} required></textarea>
        </div>
        <button type="submit" name="action" value="save" className="button button--primary button--full-width">Save</button>
      </form>
    </div>

    <div className="account-form-container" style={{
      marginTop: "20px",
    }}>
      <form action={signOut}>
        <button type="submit" name="action" value="logout" className="button button--secondary button--full-width" id="logout-button">Logout</button>
      </form>
    </div>
  </>;
}

export default function Page() {
  return <main className="account-page-wrapper">
    <div className="account-container">
      <TabsPanel
        tabs={[
          {
            content: <OrderHistory />,
            id: "order-history-tab",
            label: "Order History",
          }, {
            content: <AccountForm />,
            defaultActive: true,
            id: "account-info-tab",
            label: "Account Information",
          }
        ]}
      />
    </div>
  </main>;
}
