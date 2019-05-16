package global.coda.auth_server.security.jwt;

import global.coda.auth_server.security.services.UserPrinciple;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;

import java.util.Calendar;
import java.util.Date;

public class JwtProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    @Value("${global.coda.jwtSecret}")
    private String jwtSecret;

    @Value("${global.coda.jwtExpiration}")
    private String jwtExpiration;

    public String generateJwtToken(Authentication authentication){


        System.out.println("TEST LOG JP");
        Calendar timeout = Calendar.getInstance();
        timeout.setTimeInMillis(timeout.getTimeInMillis() + Long.parseLong(jwtExpiration));
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject((userPrinciple.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(timeout.getTime())
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public  String getUserNameFromJwtToken(String token){
        return  Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(token)
                    .getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken){

        try{
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        }
     catch (SignatureException e) {
        logger.error("Invalid JWT signature -> Message: {}", e);
    } catch (MalformedJwtException e) {
        logger.error("Invalid JWT token -> Message: {}", e);
    }  catch (UnsupportedJwtException e) {
        logger.error("Unsupported JWT token -> Message: {}", e);
    } catch (IllegalArgumentException e) {
        logger.error("JWT claims string is empty -> Message: {}", e);
    }
        return false;
    }
}
