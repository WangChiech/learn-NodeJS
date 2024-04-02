import dns from 'dns'

dns.lookup('wangjie.vip', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family)
})