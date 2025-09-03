---
enable: true # Control the visibility of this section across all pages where it is used
title: "Interested in using Mason in your workflow?"
description: "Great! We're excited to hear from you and let's start something"

# image: "/images/about-us/about-one.jpg"
# imagePosition: "left" # Choose between "left" or "right"

map:
  enable: false
  position: "right" # Choose between "left" or "right"
  title: "Map of New Work City"
  url: https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed # Embed map iframe URL generated from https://www.maps.ie/create-google-map/

# contactInformation:
#   - title: "Headquarters"
#     icon: "/images/icons/svg/location-filled.svg"
#     description: "27 Division St, New York, NY 10002, USA"
#     button:
#       # Refer to the `sharedButton` schema in `src/sections.schema.ts` for all available configuration options (e.g., enable, label, url, hoverEffect, variant, icon, tag, rel, class, target, etc.)
#       enable: true
#       label: "Get Direction"
#       url: "/"
#       # hoverEffect: "" # Optional: text-flip | creative-fill | magnetic | magnetic-text-flip
#       # variant: "" # Optional: fill | outline | text | circle
#       # rel: "" # Optional
#       # target: "" # Optional
#
#   - title: "Email Address"
#     icon: "/images/icons/svg/message-filled.svg"
#     description: |
#       mason.agency@mail.com
#       mason.agency@support.com
#     button:
#       # Refer to the `sharedButton` schema in `src/sections.schema.ts` for all available configuration options (e.g., enable, label, url, hoverEffect, variant, icon, tag, rel, class, target, etc.)
#       enable: true
#       label: "Send Message"
#       url: "mailto:mason.agency@mail.com"
#       # hoverEffect: "" # Optional: text-flip | creative-fill | magnetic | magnetic-text-flip
#       # variant: "" # Optional: fill | outline | text | circle
#       # rel: "" # Optional
#       # target: "" # Optional
#
#   - title: "Phone Number"
#     icon: "/images/icons/svg/phone-filled.svg"
#     description: |
#       +1 800 123 654 987
#       +1 800 223 984 002
#     button:
#       # Refer to the `sharedButton` schema in `src/sections.schema.ts` for all available configuration options (e.g., enable, label, url, hoverEffect, variant, icon, tag, rel, class, target, etc.)
#       enable: true
#       label: "Call Anytime"
#       url: "tel:+1800123654987"
#       # hoverEffect: "" # Optional: text-flip | creative-fill | magnetic | magnetic-text-flip
#       # variant: "" # Optional: fill | outline | text | circle
#       # rel: "" # Optional
#       # target: "" # Optional

# Check config.toml file for form action related settings
# this is also used in the footer of the personal portfolio homepage
form:
  emailSubject: "New form submission from Mason landing page" # Customized email subject (applicable when anyone submit form, form submission may receive by email depend on provider)
  submitButton:
    # Refer to the `sharedButton` schema in `src/sections.schema.ts` for all available configuration options (e.g., enable, label, url, hoverEffect, variant, icon, tag, rel, class, target, etc.)
    enable: true
    label: "JOIN WAITLIST"
    # hoverEffect: "" # Optional: text-flip | creative-fill | magnetic | magnetic-text-flip
    # variant: "" # Optional: fill | outline | text | circle
    # rel: "" # Optional
    # target: "" # Optional

  # This note will show at the end of form
  # note: |
  #   Your data is safe with us. We respect your privacy and never share your information. <br /> Read our [Privacy Policy](/privacy-policy/).
  inputs:
    - label: ""
      placeholder: "First Name *"
      name: "firstName" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      halfWidth: true
      defaultValue: ""
    - label: ""
      placeholder: "Last Name *"
      name: "lastName" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      halfWidth: true
      defaultValue: ""
    - label: ""
      placeholder: "Email Address *"
      name: "email" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      type: "email"
      halfWidth: true
      defaultValue: ""
    - label: ""
      placeholder: "Company Name"
      name: "companyName" # This is crucial. Its indicate under which name you want to receive this field data
      required: false
      halfWidth: true
      defaultValue: ""
    # - label: ""
    #   placeholder: "Business Type *"
    #   name: "businessType" # This is crucial. Its indicate under which name you want to receive this field data
    #   required: false
    #   halfWidth: true
    #   dropdown:
    #     type: "search" # select | search - default is select
    #     search: # if type is search then it will work
    #       placeholder: "Type to Search"
    #     items:
    #       - label: "Plumbing Services"
    #         value: "Plumbing Services"
    #         selected: false
    #       - label: "Electrical Services"
    #         value: "Electrical Services"
    #         selected: false
    #       - label: "HVAC Services"
    #         value: "HVAC Services"
    #         selected: false
    #       - label: "Carpentry Services"
    #         value: "Carpentry Services"
    #         selected: false
    #       - label: "Landscaping Services"
    #         value: "Landscaping Services"
    #         selected: false
    #       - label: "Painting Services"
    #         value: "Painting Services"
    #         selected: false
    #       - label: "Roofing Services"
    #         value: "Roofing Services"
    #         selected: false
    #       - label: "Masonry Services"
    #         value: "Masonry Services"
    #         selected: false
    #       - label: "Handyman Services"
    #         value: "Handyman Services"
    #         selected: false
    #       - label: "Appliance Repair"
    #         value: "Appliance Repair"
    #         selected: false
    #       - label: "Locksmith Services"
    #         value: "Locksmith Services"
    #         selected: false
    #       - label: "Cleaning Services"
    #         value: "Cleaning Services"
    #         selected: false
    #       - label: "Pest Control Services"
    #         value: "Pest Control Services"
    #         selected: false
    #       - label: "Tree Services"
    #         value: "Tree Services"
    #         selected: false
    #       - label: "Flooring Services"
    #         value: "Flooring Services"
    #         selected: false
    #       - label: "Tiling Services"
    #         value: "Tiling Services"
    #         selected: false
    #       - label: "Concrete Services"
    #         value: "Concrete Services"
    #         selected: false
    #       - label: "Window and Door Installation"
    #         value: "Window and Door Installation"
    #         selected: false
    #       - label: "Garage Door Services"
    #         value: "Garage Door Services"
    #         selected: false
    #       - label: "Fencing Services"
    #         value: "Fencing Services"
    #         selected: false
    #       - label: "Other"
    #         value: "Other"
    #         selected: false
    # - label: ""
    #   placeholder: "Subject *"
    #   name: "Subject" # This is crucial. Its indicate under which name you want to receive this field data
    #   required: false
    #   halfWidth: true
    #   dropdown:
    #     type: "" # select | search - default is select
    #     search: # if type is search then it will work
    #       placeholder: ""
    #     items:
    #       - label: "General Inquiry"
    #         value: "General Inquiry"
    #         selected: false
    #       - label: "Join Waitlist"
    #         value: "Join Waitlist"
    #         selected: false
    #       - label: "Request Quote"
    #         value: "Request Quote"
    #         selected: false
    # - label: ""
    #   placeholder: "Company Size *"
    #   name: "companySize" # This is crucial. Its indicate under which name you want to receive this field data
    #   required: false
    #   halfWidth: true
    #   dropdown:
    #     type: "" # select | search - default is select
    #     search: # if type is search then it will work
    #       placeholder: ""
    #     items:
    #       - label: "1 - 10"
    #         value: "1 - 10"
    #         selected: false
    #       - label: "11 - 30"
    #         value: "11 - 30"
    #         selected: false
    #       - label: "31+"
    #         value: "31+"
    #         selected: false
    # - label: ""
    #   tag: "textarea"
    #   defaultValue: ""
    #   rows: "2" # Only work if tag is textarea
    #   placeholder: "How can we help you *"
    #   name: "Message" # This is crucial. Its indicate under which name you want to receive this field data
    #   required: true
    #   halfWidth: false
    - label: "Google" # only valid for type="checkbox" & type === "radio"
      checked: false # only valid for type="checkbox" & type === "radio"
      name: "source" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      groupLabel: "How did you hear about us? *" # Radio Inputs Label
      group: "source" # when you add group then it will omit space between the same group radio input
      type: "radio"
      halfWidth: true
      defaultValue: ""
    - label: "Facebook" # only valid for type="checkbox" & type === "radio"
      name: "source" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      groupLabel: "" # Radio Inputs Label
      group: "source" # when you add group then it will omit space between the same group radio input
      type: "radio"
      halfWidth: true
      defaultValue: ""
    - label: "Instagram" # only valid for type="checkbox" & type === "radio"
      name: "source" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      groupLabel: "" # Radio Inputs Label
      group: "source" # when you add group then it will omit space between the same group radio input
      type: "radio"
      halfWidth: true
      defaultValue: ""
    - label: "Reddit" # only valid for type="checkbox" & type === "radio"
      name: "source" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      groupLabel: "" # Radio Inputs Label
      group: "source" # when you add group then it will omit space between the same group radio input
      type: "radio"
      halfWidth: true
      defaultValue: ""
    - label: "LinkedIn" # only valid for type="checkbox" & type === "radio"
      name: "source" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      groupLabel: "" # Radio Inputs Label
      group: "source" # when you add group then it will omit space between the same group radio input
      type: "radio"
      halfWidth: true
      defaultValue: ""
    - label: "Nextdoor" # only valid for type="checkbox" & type === "radio"
      name: "source" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      groupLabel: "" # Radio Inputs Label
      group: "source" # when you add group then it will omit space between the same group radio input
      type: "radio"
      halfWidth: true
      defaultValue: ""
    - label: "Other" # only valid for type="checkbox" & type === "radio"
      name: "source" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      groupLabel: "" # Radio Inputs Label
      group: "source" # when you add group then it will omit space between the same group radio input
      type: "radio"
      halfWidth: true
      defaultValue: ""
    # - label: "Referral" # only valid for type="checkbox" & type === "radio"
    #   name: "User Source" # This is crucial. Its indicate under which name you want to receive this field data
    #   required: true
    #   groupLabel: "" # Radio Inputs Label
    #   group: "source" # when you add group then it will omit space between the same group radio input
    #   type: "radio"
    #   halfWidth: true
    #   defaultValue: ""
    # - label: "Other" # only valid for type="checkbox" & type === "radio"
    #   name: "User Source" # This is crucial. Its indicate under which name you want to receive this field data
    #   required: true
    #   groupLabel: "" # Radio Inputs Label
    #   group: "source" # when you add group then it will omit space between the same group radio input
    #   type: "radio"
    #   halfWidth: true
    #   defaultValue: ""
    # - label: "I agree to the terms and conditions and [privacy policy](/)." # only valid for type="checkbox" & type === "radio"
    #   id: "privacy-policy"
    #   name: "Agreed Privacy" # This is crucial. Its indicate under which name you want to receive this field data
    #   value: "Agreed" # Value that will be submit (applicable for type="checkbox" & type === "radio")
    #   checked: false # only valid for type="checkbox" & type === "radio"
    #   required: true
    #   type: "checkbox"
    #   halfWidth: false
    #   defaultValue: ""
    - note: success # info | warning | success | deprecated | hint
      parentClass: "hidden text-sm message success"
      content: Thank you for joining the waitlist! We'll be sending you a confirmation email - be sure to check your spam folder!
    - note: deprecated # info | warning | success | deprecated | hint
      parentClass: "hidden text-sm message error"
      content: Something went wrong! please use this mail - [projectmasonco@gmail.com](mailto:projectmasonco@gmail.com) to submit your inquiry!
---
