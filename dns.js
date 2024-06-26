<script>
// Set up API endpoint and authentication
const cloudflareApiEndpoint = "https://api.cloudflare.com/client/v4";
const cloudflareApiToken = "9VPo9s5xiZkei_gjYynZA3T8cnX-gQRepKXyLwAv";

// Define function to update DNS record
function updateDnsRecord() {
  const zoneId = "All Zones";
  const dnsRecordId = "your_dns_record_id_here";
  const dnsRecordName = "your_dns_record_name_here";
  const dnsRecordType = "A";
  const dnsRecordValue = "your_dns_record_value_here";

  // Get current DNS record
  const endpoint = `/zones/${zoneId}/dns_records?name=${dnsRecordName}&type=${dnsRecordType}`;
  fetch(cloudflareApiEndpoint + endpoint, {
    method: "GET",
    headers: {
      "X-Auth-Email": "sb543267@gmail.com",
      "X-Auth-Key": 9VPo9s5xiZkei_gjYynZA3T8cnX-gQRepKXyLwAv,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const dnsRecord = data.result[0];

      // Update DNS record
      if (dnsRecord.content !== dnsRecordValue) {
        const data = {
          type: dnsRecordType,
          name: dnsRecordName,
          content: dnsRecordValue,
          ttl: dnsRecord.ttl,
          proxied: dnsRecord.proxied,
        };
        const endpoint = `/zones/${zoneId}/dns_records/${dnsRecordId}`;
        fetch(cloudflareApiEndpoint + endpoint, {
          method: "PUT",
          headers: {
            "X-Auth-Email": "sb543267@gmail.com",
            "X-Auth-Key": 9VPo9s5xiZkei_gjYynZA3T8cnX-gQRepKXyLwAv,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.status === 200) {
              console.log(`DNS record ${dnsRecordName} updated to ${dnsRecordValue}`);
            } else {
              console.log(`Error updating DNS record ${dnsRecordName}: ${response.statusText}`);
            }
          })
          .catch((error) => {
            console.log(`Error updating DNS record ${dnsRecordName}: ${error}`);
          });
      }
    })
    .catch((error) => {
      console.log(`Error getting DNS record ${dnsRecordName}: ${error}`);
    });
}

// Call function to update DNS record
updateDnsRecord();
</script>
