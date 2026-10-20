package vn.hiepln.feedemo.api;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.math.BigDecimal;
import java.util.List;

/**
 * Code "có sẵn" trước buổi demo. Chỉ có bảng phí, chưa có endpoint tính tiền.
 * Spec-driven demo sẽ thêm POST /orders/quote lên trên nền này.
 */
@Path("/fees")
@Produces(MediaType.APPLICATION_JSON)
public class FeeResource {

    public record FeeSchedule(String name, BigDecimal rate, String appliesTo) {}

    private static final List<FeeSchedule> SCHEDULE = List.of(
            new FeeSchedule("BROKERAGE", new BigDecimal("0.0015"), "BUY_AND_SELL"),
            new FeeSchedule("SELL_TAX", new BigDecimal("0.0010"), "SELL_ONLY")
    );

    @GET
    public List<FeeSchedule> schedule() {
        return SCHEDULE;
    }
}
