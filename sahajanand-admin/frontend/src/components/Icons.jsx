/* Small stroke icons shared by the admin screens (presentation only) */
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
}

export const PlusIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const SearchIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

export const TrashIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
  </svg>
)

export const ExternalIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
)

export const PinIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)

export const ClockIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const DownloadIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" />
  </svg>
)

export const MailIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

export const PhoneIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
)

export const BriefcaseIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
  </svg>
)

export const AppsIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <rect x="6" y="2" width="12" height="20" rx="2.5" />
    <path d="M11 18h2" />
  </svg>
)

export const BotIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <rect x="4" y="8" width="16" height="12" rx="3" />
    <path d="M12 8V4M9 14h.01M15 14h.01M2 13v2M22 13v2" />
  </svg>
)

export const InboxIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <path d="M4 13 6.5 5.5A2 2 0 0 1 8.4 4h7.2a2 2 0 0 1 1.9 1.5L20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5z" />
    <path d="M4 13h4l1 2h6l1-2h4" />
  </svg>
)

export const ArrowLeftIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
  </svg>
)

export const PencilIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <path d="M4 20h4L19 9a2.1 2.1 0 0 0-4-4L4 16v4zM13.5 6.5l4 4" />
  </svg>
)

export const LogoutIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3M16 8l4 4-4 4M20 12H9" />
  </svg>
)

export const BlogIcon = (props) => (
  <svg className="icon" {...base} {...props}>
    <path d="M6 3h9l4 4v14H6z" />
    <path d="M14 3v5h5M9 13h7M9 17h7M9 9h2" />
  </svg>
)
